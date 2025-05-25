"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "HOME", href: "/" },
    { name: "OUR PRODUCT", href: "/products" },
    { name: "ABOUT US", href: "/about" },
    { name: "GALLERY", href: "/gallery" },
    { name: "CONTACT US", href: "/contact" },
  ]

  return (
    <nav className="bg-black text-white fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-red-600 p-2 rounded">
              <span className="text-white font-bold">📦</span>
            </div>
            <span className="font-bold text-lg">PRIMADONA & CO</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`hover:text-red-600 transition-colors ${
                  item.name === "CONTACT US" ? "bg-red-600 px-4 py-2 rounded" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Company Info */}
          <div className="hidden lg:block text-sm">
            <p>Jl. Garuda I, Medan Krio, Kec. Sunggal, Kabupaten</p>
            <p>Deli Serdang, Sumatera Utara 20351</p>
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-white hover:text-red-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
