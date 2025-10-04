# Meseki Coming Soon Website

A beautiful, modern coming soon website for Meseki fashion brand built with Next.js and Tailwind CSS.

## Features

- **Responsive Design**: Optimized for both mobile and desktop
- **Modern UI**: Clean, elegant design with glassmorphism effects
- **Countdown Timer**: Dynamic countdown to launch date
- **Email Signup**: Newsletter subscription form
- **Social Links**: Comprehensive links page with all social media platforms
- **Smooth Animations**: Hover effects and transitions
- **SEO Optimized**: Proper meta tags and structure

## Pages

1. **Home Page** (`/`): Coming soon page with countdown timer and email signup
2. **My Links** (`/my-links`): All social media and contact links

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### Background Images
To add your custom background images:

1. **Mobile Background**: Place your mobile background image in `public/images/mobile-bg.jpg`
2. **Desktop Background**: Place your desktop background image in `public/images/desktop-bg.jpg`

Then update the background image URLs in:
- `app/page.tsx` (line with `backgroundImage`)
- `app/my-links/page.tsx` (line with `backgroundImage`)

### Launch Date
Update the launch date in `app/page.tsx`:
```javascript
const launchDate = new Date('2024-06-01T00:00:00Z').getTime()
```

### Social Links
Update the links in `app/my-links/page.tsx` in the `links` array.

### Brand Colors
Customize colors in `tailwind.config.js` or update the gradient classes in the components.

## Deployment

Build the project:
```bash
npm run build
```

The built files will be in the `.next` folder, ready for deployment to platforms like Vercel, Netlify, or any other hosting service.

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Google Fonts (Inter)
