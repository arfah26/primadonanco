import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/placeholder.svg?height=400&width=1920')",
            filter: "brightness(0.4)",
          }}
        />
        <div className="relative z-10 text-center">
          <div className="bg-red-600 text-white p-4 rounded mb-4 inline-block">
            <span className="text-2xl font-bold">📦 PRIMADONA & CO</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">CV.PRIMADONA & CO</h1>
          <p className="text-xl">PRODUCER & EXPORTER CHARCOAL</p>

          <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-red-600 mr-2">📍</span>
                <span>Jl.Garuda I no. 09 Sei Semayang Medan</span>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-red-600 mr-2">📞</span>
                <span>Contact Us</span>
              </div>
              <p className="text-sm">Telp & Fax : 061-8461239</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-red-600 mr-2">📧</span>
                <span>Email Us</span>
              </div>
              <p className="text-sm">primadona_53@yahoo.co.id</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-red-600">Vision</span>
            </h2>
            <div className="border-l-4 border-red-600 pl-6">
              <p className="text-gray-300">Supplying best hardwood charcoal to all over the world.</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-red-600">Mission</span>
            </h2>
            <div className="border-l-4 border-red-600 pl-6">
              <p className="text-gray-300">
                Produce high quality products, maintaining relationship with clients, fulfilling global demand on time
                and participate in improving the regional economy through empowering the surrounding community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-red-600 p-8 rounded-lg relative">
              <h2 className="text-4xl font-bold mb-8">
                ABOUT <span className="text-white">US</span>
              </h2>
              <div className="bg-white p-4 rounded">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Company Facility"
                  width={400}
                  height={300}
                  className="rounded"
                />
              </div>
            </div>

            <div>
              <p className="text-gray-300 leading-relaxed mb-6">
                CV. PRIMADONA AND CO is a charcoal producer and exporter from North Sumatra, having been established in
                1997. Located in Medan, North Sumatra, having 26 years experience in the charcoal business, CV PRIMADONA
                AND CO has established charcoal production in the hands of excellent good relations with buyers from all
                over the world, quality to customers satisfaction. We keep our product in safety environment which is
                all area covered.
              </p>

              <p className="text-gray-300 leading-relaxed mb-6">
                In warehouse, we separated products that are ready to export. We have experience in export our product
                to many countries and the products which are need to do more cooling.
              </p>

              <p className="text-gray-300 leading-relaxed">
                We put it far from product ready to export. We have surveillance camera all over the warehouse to keep
                safety and quality control of our products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-black rounded-lg p-8">
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">▶️</span>
                </div>
                <p className="text-gray-400">CV PRIMADONA & CO</p>
                <p className="text-sm text-gray-500">Company Video</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destination Countries */}
      <section className="py-16 px-4 bg-white text-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">
            DESTINATION <span className="text-red-600">COUNTRIES</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {[
              { name: "Middle East", flag: "🇵🇸" },
              { name: "South Korea", flag: "🇰🇷" },
              { name: "Flag of Taiwan", flag: "🇹🇼" },
              { name: "Italia", flag: "🇮🇹" },
              { name: "Turkey", flag: "🇹🇷" },
              { name: "Australia", flag: "🇦🇺" },
            ].map((country, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl mb-2">{country.flag}</div>
                <p className="font-medium">{country.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
