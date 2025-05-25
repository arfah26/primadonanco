import Image from "next/image"

export default function GalleryPage() {
  const galleryImages = [
    { src: "/placeholder.svg?height=300&width=400", alt: "Charcoal Loading" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Warehouse Storage" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Production Process" },
    { src: "/placeholder.svg?height=200&width=300", alt: "Product Packaging" },
    { src: "/placeholder.svg?height=200&width=300", alt: "Quality Control" },
    { src: "/placeholder.svg?height=400&width=400", alt: "Charcoal Fire" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Product Samples" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Export Ready" },
    { src: "/placeholder.svg?height=200&width=300", alt: "Charcoal Pieces" },
    { src: "/placeholder.svg?height=200&width=300", alt: "Packaging Process" },
    { src: "/placeholder.svg?height=400&width=400", alt: "Large Charcoal" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Final Product" },
    { src: "/placeholder.svg?height=200&width=300", alt: "Raw Materials" },
    { src: "/placeholder.svg?height=200&width=300", alt: "White Packaging" },
    { src: "/placeholder.svg?height=200&width=300", alt: "Product Variety" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-6xl font-bold mb-8">
          OUR <span className="text-red-600">GALLERY</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit tellus, luctus nec ullamcorper mattis,
          pulvinar dapibus leo.
        </p>
      </section>

      {/* Gallery Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Large featured image */}
            <div className="md:col-span-2 md:row-span-2">
              <Image
                src={galleryImages[2].src || "/placeholder.svg"}
                alt={galleryImages[2].alt}
                width={600}
                height={400}
                className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Regular grid images */}
            {galleryImages.slice(0, 2).map((image, index) => (
              <div key={index} className="aspect-square">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}

            {galleryImages.slice(3, 5).map((image, index) => (
              <div key={index + 3} className="aspect-square">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}

            {/* Another large image */}
            <div className="md:col-span-2">
              <Image
                src={galleryImages[5].src || "/placeholder.svg"}
                alt={galleryImages[5].alt}
                width={600}
                height={300}
                className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </div>

            {galleryImages.slice(6, 8).map((image, index) => (
              <div key={index + 6} className="aspect-square">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}

            {/* Large vertical image */}
            <div className="row-span-2">
              <Image
                src={galleryImages[10].src || "/placeholder.svg"}
                alt={galleryImages[10].alt}
                width={400}
                height={600}
                className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </div>

            {galleryImages.slice(8, 10).map((image, index) => (
              <div key={index + 8} className="aspect-square">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}

            {galleryImages.slice(11, 13).map((image, index) => (
              <div key={index + 11} className="aspect-square">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}

            {/* Bottom row */}
            <div className="md:col-span-2">
              <Image
                src={galleryImages[11].src || "/placeholder.svg"}
                alt={galleryImages[11].alt}
                width={600}
                height={300}
                className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </div>

            {galleryImages.slice(13, 15).map((image, index) => (
              <div key={index + 13} className="aspect-square">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
