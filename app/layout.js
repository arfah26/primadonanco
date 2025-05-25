import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CV. Primadona & Co - Charcoal Producer & Exporter",
  description:
    "Leading charcoal producer and exporter from North Sumatra, Indonesia. Supplying best hardwood charcoal worldwide since 1997."
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
