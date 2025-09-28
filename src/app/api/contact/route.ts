import { NextResponse } from "next/server";
import * as z from "zod";

// Force Node.js runtime (required for Nodemailer)
export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

const emailEnvSchema = z.object({
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z
    .string()
    .transform((v) => Number(v))
    .pipe(z.number().int().positive()),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
  SMTP_SECURE: z
    .string()
    .optional()
    .transform((v) => (v ? v === "true" : undefined)),
  CONTACT_TO: z.string().email(),
  CONTACT_FROM: z.string().email(),
});

async function getTransporter() {
  let nodemailerModule: typeof import("nodemailer") | undefined;
  try {
    nodemailerModule = (await import("nodemailer")).default;
  } catch (err) {
    throw new Error(
      "Email transport not available: Nodemailer is not installed. Please add 'nodemailer' to dependencies."
    );
  }

  const env = emailEnvSchema.safeParse(process.env);

  // If env is invalid in development, fall back to Ethereal test account
  if (!env.success) {
    if (process.env.NODE_ENV !== "production") {
      const testAccount = await (await import("nodemailer")).default.createTestAccount();
      const transporter = nodemailerModule.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
      await transporter.verify();
      return { transporter, from: `Test Sender <${testAccount.user}>`, isTest: true as const };
    }
    const issues = env.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ");
    throw new Error(`Email configuration invalid or missing: ${issues}`);
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, CONTACT_FROM } = env.data;

  const transporter = nodemailerModule.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE ?? SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  // Verify connection configuration
  await transporter.verify();

  return { transporter, from: CONTACT_FROM, isTest: false as const };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        { ok: false, message: "Validation failed", errors },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;

    const { transporter, from, isTest } = await getTransporter();
    const toEmail = process.env.CONTACT_TO || from;

    const subject = `New contact form message from ${name}`;
    const text = `You received a new message via the website contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New contact form message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from,
      to: toEmail,
      replyTo: email,
      subject,
      text,
      html,
    });

    let previewUrl: string | undefined;
    if (isTest) {
      const nodemailerModule = (await import("nodemailer")).default;
      previewUrl = nodemailerModule.getTestMessageUrl(info) || undefined;
    }

    return NextResponse.json({ ok: true, message: "Message sent successfully", previewUrl });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json(
      { ok: false, message: `Failed to send message: ${message}` },
      { status: 500 }
    );
  }
}

