"use client"

import Image from "next/image"
import { useState } from "react"

export default function GalleryPage() {
  // Generate 22 gallery images dynamically
  const [galleryImages] = useState(
    Array.from({ length: 22 }, (_, i) => ({
      id: i + 1,
      image: `/gallery/gallery${i + 1}.jpg`,
      title: `Gallery Image ${i + 1}`,
      width: 300,
      height: 200,
    }))
  );

  const [settings] = useState({
    galleryPageDescription:
      "Welcome to our charcoal gallery! Explore our extensive range of high-quality charcoal products.",
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-white bg-black">
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl font-bold mb-8">
            OUR <span className="text-red-600">GALLERY</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            {settings.galleryPageDescription}
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          {galleryImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryImages.map((image) => (
                <div key={image.id} className="relative aspect-w-3 aspect-h-2 group">
                  <Image
                    src={image.image}
                    alt={image.title}
                    width={image.width}
                    height={image.height}
                    className="rounded-lg group-hover:opacity-75 transition-opacity duration-300 object-cover"
                    unoptimized
                    priority={image.id <= 3} // Load first 3 images with priority
                    placeholder="blur" // Use a blurred placeholder
                    blurDataURL={`/gallery/gallery${image.id}-blur.jpg`} // Provide a low-quality image placeholder
                  />
                  {image.title && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-lg font-semibold p-4 text-center">
                        {image.title}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 text-xl">
              No images found in the gallery yet.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
