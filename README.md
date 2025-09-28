# SG Partner Website

Next.js 15 app using the App Router, Tailwind CSS, and shadcn/ui.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

Copy `.env.example` to `.env.local` and fill in SMTP settings for the contact form:

```bash
cp .env.example .env.local
```

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
- Optional: `SMTP_FROM`, `CONTACT_TO_EMAIL` (defaults to `SMTP_USER`)

3. Run the development server:

```bash
npm run dev
```

## Contact Form

The contact form at `/contact` posts to `/api/contact` which validates input with `zod` and sends an email using Nodemailer. In development without SMTP variables, it uses a JSON transport (no real emails sent).

## Deployment

- Requires Node.js runtime for API routes. Ensure your hosting supports Next.js server functions (do not use static export).
- Set the SMTP environment variables in your hosting provider for email delivery.

