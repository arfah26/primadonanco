"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState([])
  const [settings, setSettings] = useState({
    galleryPageDescription: "Loading gallery description...",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Fetch gallery images
        const galleryRes = await fetch("/api/gallery")
        const galleryData = await galleryRes.json()
        if (galleryData.success && galleryData.data) {
          setGalleryImages(galleryData.data)
        } else {
          console.error("Failed to fetch gallery images:", galleryData.error || "No data")
        }

        // Fetch settings for description
        const settingsRes = await fetch("/api/settings")
        const settingsData = await settingsRes.json()
        if (settingsData.success && settingsData.data) {
          setSettings((prevSettings) => ({ ...prevSettings, ...settingsData.data }))
        } else {
          console.error("Failed to fetch settings for gallery page:", settingsData.error || "No data")
        }
      } catch (error) {
        console.error("Error fetching gallery page data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Loading gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section
        className="relative h-96 flex items-center justify-center text-white bg-black" // Added bg-black as fallback
      >
        {settings.gallery_page_hero_image_url && (
          <Image
            src={settings.gallery_page_hero_image_url}
            alt="Gallery Hero"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
            style={{ filter: "brightness(0.6)" }} // Apply brightness to the image
            unoptimized={settings.gallery_page_hero_image_url?.startsWith('/')}
          />
        )}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl font-bold mb-8">
            OUR <span className="text-red-600">GALLERY</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto"> {/* Adjusted text color for better visibility on image */}
            {settings.gallery_page_description || "Explore our collection of high-quality charcoal products and facilities."}
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          {galleryImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id || index} // Prefer a unique ID from data if available
                  className="aspect-w-1 aspect-h-1 group relative" // aspect ratio for consistent sizing
                >
                  <Image
                    src={image.image || image.src || "/placeholder.svg"} // Use 'image.image' or 'image.src' based on your data structure
                    alt={image.title || image.alt || "Gallery image"} // Use 'image.title' or 'image.alt'
                    layout="fill" // Use layout fill for aspect ratio
                    objectFit="cover" // Cover the area
                    className="rounded-lg group-hover:opacity-75 transition-opacity duration-300"
                  />
                  {image.title && (
                     <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-lg font-semibold p-4 text-center">{image.title}</p>
                     </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 text-xl">No images found in the gallery yet.</p>
          )}
        </div>
      </section>
    </div>
  )
}
