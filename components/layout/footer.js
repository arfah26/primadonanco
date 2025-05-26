import Link from "next/link"
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Navigation Links */}
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="hover:text-red-600 transition-colors">
              HOME
            </Link>
            <Link href="/products" className="hover:text-red-600 transition-colors">
              OUR PRODUCT
            </Link>
            <Link href="/about" className="hover:text-red-600 transition-colors">
              ABOUT US
            </Link>
            <Link href="/gallery" className="hover:text-red-600 transition-colors">
              GALLERY
            </Link>
            <Link href="/contact" className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition-colors">
              CONTACT US
            </Link>
          </div>

          {/* Company Info */}
          <div className="text-center">
            <p className="text-sm">Jl. Garuda I, Medan Krio, Kec. Sunggal, Kabupaten</p>
            <p className="text-sm">Deli Serdang, Sumatera Utara 20351</p>
          </div>

          {/* Logo */}
          <div className="flex justify-end items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-red-600 p-2 rounded">
                <span className="text-white font-bold">
                  <Image
                    src="/Primadona_512.png"
                    alt="Company Facility"
                    width={50}
                    height={50}
                    className="rounded"
                    unoptimized // disables Next.js image optimization (use only for static/local images)
                  />
                </span>
              </div>
              <span className="font-bold">PRIMADONA & CO</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Float */}
        <div className="fixed bottom-4 right-4">
          <a
            href="https://wa.me/628126012712"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors flex items-center space-x-2"
          >
            <span className="text-xl">💬</span>
            <span className="hidden sm:inline text-sm">How can I help you?</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
