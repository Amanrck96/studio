# Deployment Guide for SG Partner Website

This guide covers deploying the SG Partner website to various hosting platforms.

## Prerequisites

Before deployment, ensure you have:
1. Configured EmailJS (see [SETUP_EMAILJS.md](./SETUP_EMAILJS.md))
2. Built the project successfully (`npm run build`)
3. All environment variables ready

## Deployment Options

### 1. Netlify (Recommended for Static Sites)

#### Option A: Git Integration
1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Set build settings:
   - **Build command**: `npm run export`
   - **Publish directory**: `out`
4. Add environment variables in Netlify dashboard:
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`

#### Option B: Manual Upload
1. Run `npm run export`
2. Upload the `out` folder to Netlify
3. Configure environment variables in dashboard

### 2. Vercel (Next.js Optimized)

#### Option A: Git Integration
1. Connect your GitHub repository to Vercel
2. Vercel automatically detects Next.js settings
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

#### Option B: Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

### 3. GitHub Pages

#### Automatic Deployment (Recommended)
1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Set source to "GitHub Actions"
4. Add secrets in repository settings:
   - `EMAILJS_PUBLIC_KEY`
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
5. Push to main branch to trigger deployment

#### Manual Deployment
```bash
npm run export
# Upload contents of 'out' folder to gh-pages branch
```

### 4. Firebase Hosting

```bash
npm install -g firebase-tools
npm run export
firebase login
firebase init hosting
# Select 'out' as public directory
firebase deploy
```

### 5. AWS S3 + CloudFront

1. Build the project:
   ```bash
   npm run export
   ```
2. Upload `out` folder contents to S3 bucket
3. Configure S3 for static website hosting
4. Set up CloudFront distribution for CDN

## Environment Variables Setup

For each hosting platform, configure these environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key | `user_xxxxxxxxx` |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID | `service_xxxxxxx` |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID | `template_xxxxxx` |

## Custom Domain Setup

### Netlify
1. Go to Site settings > Domain management
2. Add custom domain
3. Configure DNS records with your domain provider

### Vercel
1. Go to Project settings > Domains
2. Add your domain
3. Configure DNS records

### GitHub Pages
1. Go to repository Settings > Pages
2. Add custom domain in "Custom domain" field
3. Create CNAME file in repository root

## SSL Certificate

All recommended hosting platforms provide free SSL certificates:
- **Netlify**: Automatic SSL with Let's Encrypt
- **Vercel**: Automatic SSL
- **GitHub Pages**: Automatic SSL for custom domains
- **Firebase**: Free SSL certificates

## Performance Optimization

### Before Deployment
1. Optimize images in `/public` folder
2. Run `npm run build` to check bundle size
3. Test on different devices and browsers

### After Deployment
1. Test contact form functionality
2. Check all navigation links
3. Verify mobile responsiveness
4. Test dark/light mode toggle
5. Validate HTML and accessibility

## Monitoring and Analytics

Consider adding:
1. **Google Analytics** - Add tracking code to layout.tsx
2. **Google Search Console** - Submit sitemap
3. **Uptime monitoring** - Use services like UptimeRobot

## Troubleshooting

### Common Issues

1. **Contact form not working**
   - Check environment variables are set correctly
   - Verify EmailJS configuration
   - Check browser console for errors

2. **Build failures**
   - Run `npm run lint` and fix issues
   - Check for TypeScript errors with `npm run typecheck`
   - Verify all dependencies are installed

3. **Images not loading**
   - Ensure images are in `/public` folder
   - Check image paths are correct
   - Verify image optimization settings

4. **Routing issues**
   - Check `next.config.ts` settings
   - Verify all pages exist in `/src/app`
   - Check for trailing slash configuration

### Getting Help

If you encounter issues:
1. Check the hosting platform's documentation
2. Review build logs for error messages
3. Test locally with `npm run build && npm run start`
4. Contact support: sgpartnerindia@gmail.com

## Maintenance

### Regular Tasks
1. Update dependencies monthly
2. Monitor contact form submissions
3. Check website performance
4. Update content as needed
5. Backup website files

### Security
1. Keep dependencies updated
2. Monitor for security vulnerabilities
3. Use HTTPS only
4. Regularly check EmailJS usage

---

For additional support, contact the development team at sgpartnerindia@gmail.com