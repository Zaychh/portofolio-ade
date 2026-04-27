import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600'],
  variable: '--font-cormorant',   // ← match dengan @theme
})

const dmSans = DM_Sans({
  subsets:  ['latin'],
  variable: '--font-dm-sans',     // ← match dengan @theme
})

export const metadata: Metadata = {
  title: "Portofolio - Ade Tirtha Wieyasha",
  description: "Welcome To My World",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-charcoal text-cream">
        {children}
      </body>
    </html>
  )
}