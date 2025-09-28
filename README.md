# SG Partner - Corporate Website

A modern, responsive corporate website built with Next.js, TypeScript, and Tailwind CSS. This website showcases SG Partner's services in recruitment, campus engagement, and corporate solutions.

## 🚀 Features

- **Modern Design**: Clean, professional interface with dark/light mode support
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Contact Form**: Functional contact form with EmailJS integration
- **Static Export**: Optimized for static hosting platforms
- **SEO Optimized**: Built-in SEO features and meta tags
- **Performance**: Fast loading with optimized images and code splitting

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Form Handling**: React Hook Form + Zod validation
- **Email Service**: EmailJS for contact form
- **Icons**: Lucide React
- **Deployment**: Static export compatible

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn package manager

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sg-partner-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your EmailJS credentials (see [SETUP_EMAILJS.md](./SETUP_EMAILJS.md) for detailed instructions).

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:9002](http://localhost:9002)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run export` - Build and export static files
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## 📧 Contact Form Setup

The contact form uses EmailJS for sending emails from static sites. Follow these steps:

1. Create an EmailJS account at [emailjs.com](https://www.emailjs.com/)
2. Set up your email service and template
3. Configure environment variables in `.env.local`

For detailed setup instructions, see [SETUP_EMAILJS.md](./SETUP_EMAILJS.md).

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── blog/              # Blog pages
│   ├── clientele/         # Clientele page
│   ├── contact/           # Contact page
│   ├── expertise/         # Expertise page
│   ├── services/          # Services page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   └── ui/               # UI components
├── hooks/                # Custom hooks
└── lib/                  # Utility functions
```

## 🌐 Pages

- **Home** (`/`) - Landing page with hero section and overview
- **About Us** (`/about`) - Company information and mission
- **Expertise** (`/expertise`) - Core competencies and skills
- **Services** (`/services`) - Detailed service offerings
- **Clientele** (`/clientele`) - Client testimonials and case studies
- **Contact** (`/contact`) - Contact form and company details
- **Blog** (`/blog`) - Articles and insights

## 🎨 Customization

### Theme
The website supports both light and dark themes. The theme toggle is available in the header.

### Colors
Primary colors can be customized in `tailwind.config.ts`:
- Primary: Company brand color
- Accent: Highlight color
- Muted: Secondary text and backgrounds

### Content
Update content in the respective component files under `src/components/sections/`.

## 📦 Deployment

### Static Hosting (Recommended)

The project is configured for static export and can be deployed to:

1. **Netlify**
   ```bash
   npm run export
   ```
   Upload the `out` folder to Netlify

2. **Vercel**
   ```bash
   npm run build
   ```
   Connect your GitHub repository to Vercel

3. **GitHub Pages**
   ```bash
   npm run export
   ```
   Deploy the `out` folder to gh-pages branch

### Environment Variables for Production

Set these environment variables in your hosting platform:
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` 
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`

## 🔧 Configuration

### Next.js Configuration
The `next.config.ts` file includes:
- Static export configuration
- Image optimization settings
- TypeScript and ESLint configurations

### Tailwind CSS
Custom configurations in `tailwind.config.ts` for:
- Font families (Playfair Display, PT Sans)
- Custom colors and themes
- Component styling

## 🐛 Troubleshooting

### Contact Form Issues
- Verify EmailJS configuration in `.env.local`
- Check browser console for error messages
- Ensure all required environment variables are set

### Build Issues
- Run `npm run typecheck` to identify TypeScript errors
- Run `npm run lint` to check for linting issues
- Clear `.next` folder and rebuild if needed

## 📞 Support

For technical support or questions about this website:
- Email: sgpartnerindia@gmail.com
- Phone: Anand - 63633 75377

## 📄 License

This project is proprietary and confidential. All rights reserved by SG Partner.

---

Built with ❤️ by the SG Partner development team.