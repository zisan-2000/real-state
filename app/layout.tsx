import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter, Tajawal } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-arabic" })

export const metadata: Metadata = {
  title: "Real Estate Development Initiative | Saudi Arabia",
  description: "Enhancing Investment Opportunities in Real Estate across Saudi Arabia",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${tajawal.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
