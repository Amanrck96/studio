# EmailJS Setup Instructions

This project uses EmailJS to handle contact form submissions for static hosting. Follow these steps to configure EmailJS:

## 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create a free account
3. Verify your email address

## 2. Create Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your chosen provider
5. Note down the **Service ID**

## 3. Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: {{subject}} - Contact Form Submission

Hello,

You have received a new message from your website contact form:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

Best regards,
Website Contact Form
```

4. Note down the **Template ID**

## 4. Get Public Key

1. Go to "Account" in your dashboard
2. Find your **Public Key** in the API Keys section

## 5. Configure Environment Variables

1. Copy `.env.example` to `.env.local`
2. Replace the placeholder values with your actual EmailJS credentials:

```
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_actual_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_actual_template_id
```

## 6. Test the Contact Form

1. Start the development server: `npm run dev`
2. Navigate to the contact page
3. Fill out and submit the form
4. Check your configured email address for the message

## Important Notes

- Keep your `.env.local` file secure and never commit it to version control
- The public key is safe to use in client-side code (hence the NEXT_PUBLIC_ prefix)
- EmailJS free plan allows 200 emails per month
- For production deployment, ensure environment variables are set in your hosting platform

## Troubleshooting

- If emails aren't being sent, check the browser console for errors
- Verify all environment variables are correctly set
- Ensure your email service is properly configured in EmailJS dashboard
- Check your spam folder for test emails