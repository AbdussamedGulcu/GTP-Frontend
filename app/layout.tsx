import type { Metadata, Viewport } from 'next'
import { Orbitron, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AppProvider } from '@/lib/context'
import { Header } from '@/components/header'
import { ParallaxStars } from '@/components/parallax-stars'
import './globals.css'

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900']
});
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'GTP - Cross-Game Achievement Rewards',
  description: 'Unlock rewards across games using your achievements. The ultimate Web3 gaming platform.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen bg-background">
        <AppProvider>
          <div className="min-h-screen space-background">
            <ParallaxStars />
            <Header />
            {children}
          </div>
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </AppProvider>
      </body>
    </html>
  )
}
