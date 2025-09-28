import { NextResponse } from "next/server";
import * as z from "zod";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error("SMTP configuration is missing. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.");
  }

  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const { name, email, message } = parsed.data;

    const transporter = getTransporter();

    const from = process.env.SMTP_FROM || process.env.SMTP_USER || "no-reply@example.com";
    const to = process.env.SMTP_TO || process.env.SMTP_USER || from;

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error("/api/contact error", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

