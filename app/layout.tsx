import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "NeurusAGi - A Quantum Leap in Intelligence",
  description: "Pioneering the future of artificial general intelligence with breakthrough quantum-enhanced neural architectures. Transform your business with next-generation AI.",
  keywords: ["AGI", "Artificial General Intelligence", "Quantum AI", "Neural Networks", "Machine Learning", "AI Platform"],
  authors: [{ name: "NeurusAGi" }],
  openGraph: {
    title: "NeurusAGi - A Quantum Leap in Intelligence",
    description: "Pioneering the future of artificial general intelligence with breakthrough quantum-enhanced neural architectures.",
    type: "website",
    locale: "en_US",
    siteName: "NeurusAGi",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeurusAGi - A Quantum Leap in Intelligence",
    description: "Pioneering the future of artificial general intelligence.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-black text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
