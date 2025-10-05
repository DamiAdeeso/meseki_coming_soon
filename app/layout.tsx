import type { Metadata } from 'next'
import './globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: 'Meseki - Coming Soon',
  description: 'Meseki Fashion Brand - Coming Soon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <SpeedInsights/>
      <head>
        {/* Preload critical background images */}
        <link rel="preload" as="image" href="/images/desktop-bg-optimized.webp" />
        <link rel="preload" as="image" href="/images/mobile-bg-optimized.webp" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
