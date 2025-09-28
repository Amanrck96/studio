import nodemailer, { Transporter } from "nodemailer";

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  auth: { user: string; pass: string };
};

function buildSmtpConfigFromEnv(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";

  if (!host || !port || !user || !pass) {
    return null;
  }

  return {
    host,
    port,
    secure,
    auth: { user, pass },
  };
}

let cachedTransporter: Transporter | null = null;

export function getEmailTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;

  const smtpConfig = buildSmtpConfigFromEnv();

  if (smtpConfig) {
    cachedTransporter = nodemailer.createTransport(smtpConfig);
    return cachedTransporter;
  }

  // Fallback for local/dev without SMTP credentials
  cachedTransporter = nodemailer.createTransport({ jsonTransport: true });
  return cachedTransporter;
}

export async function sendContactEmail(params: {
  name: string;
  email: string;
  message: string;
}) {
  const toAddress = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
  const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER || "no-reply@example.com";

  const transporter = getEmailTransporter();

  const info = await transporter.sendMail({
    from: fromAddress,
    to: toAddress,
    replyTo: params.email,
    subject: `New contact message from ${params.name}`,
    text: `Name: ${params.name}\nEmail: ${params.email}\n\n${params.message}`,
    html: `<p><strong>Name:</strong> ${params.name}</p>
           <p><strong>Email:</strong> ${params.email}</p>
           <p><strong>Message:</strong></p>
           <p style="white-space: pre-wrap;">${params.message}</p>`,
  });

  return info;
}

