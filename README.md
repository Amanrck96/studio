# SG Partner Reimagined

Modernized website built with Next.js App Router, Tailwind, and shadcn/ui.

## Contact Form

The contact form posts to `POST /api/contact` and sends an email via SMTP.

### Environment Variables

Copy `.env.example` to `.env.local` and set:

```
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
CONTACT_TO_EMAIL=...
```

### Run locally

```
npm i
npm run dev
```

### Deployment

- Recommended hosting: Vercel. Add the env vars above to the project settings.
- Build command: `npm run build`
- Start command: `next start` (Vercel auto-detects)

### Notes

- Client-side validation uses `zod` and `react-hook-form`.
- Toast notifications show success/error; the `Toaster` is included in `src/app/layout.tsx`.
