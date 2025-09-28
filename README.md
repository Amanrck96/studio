# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at `src/app/page.tsx`.

## Getting Started

1. Install dependencies: `npm install`
2. Create `.env.local` with SMTP config (see below)
3. Run development server: `npm run dev` and open http://localhost:9002

### Contact form configuration

Create a `.env.local` file with your SMTP settings, for example:

```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SMTP_SECURE=false
CONTACT_FROM=web@yourdomain.com
CONTACT_TO=owner@yourdomain.com
```

The contact form sends POST requests to `/api/contact` and will deliver emails via SMTP using the above credentials.
