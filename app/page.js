"use client"

import { useState, useEffect } from "react" // Added useState
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin } from "lucide-react"

export default function HomePage() {
  const [settings, setSettings] = useState({
    home_hero_background_url: "linear-gradient(135deg, #ea580c 0%, #dc2626 50%, #2563eb 100%)", // Default gradient
    home_secondary_image_url: "/placeholder.svg?height=400&width=600",
    company_phone: "061-8461239",
    company_address: "Jl. Garuda I No.09 Sei Semayang Medan - Indonesia",
    company_email: "primadona_53@yahoo.co.id",
    home_hero_title: "We Have Supplying best<br /><span class='text-red-600'>Hardwood</span>", // Default title
    home_company_info_title: "The best company in 2023", // Default for the text below secondary image
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Track page visit
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "visit" }),
    });

    // Fetch settings
    const fetchPageSettings = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/settings");
        const data = await response.json();
        if (data.success && data.data) {
          setSettings(prevSettings => ({ ...prevSettings, ...data.data }));
        } else {
          console.error("HomePage: Failed to fetch settings", data.error);
        }
      } catch (error) {
        console.error("HomePage: Error fetching settings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPageSettings();
  }, []);

  // Helper to render HTML string safely
  const renderHTML = (htmlString) => {
    return { __html: htmlString || "" };
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: settings.home_hero_background_url?.startsWith('/')
              ? `url('${settings.home_hero_background_url}')`
              : settings.home_hero_background_url, // Allows for gradient strings or URL strings
            filter: "brightness(0.8)",
          }}
        />
        <div className="relative z-10 text-center px-4">
          <h1
            className="text-5xl md:text-7xl font-bold mb-6"
            dangerouslySetInnerHTML={renderHTML(settings.home_hero_title)}
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild className="bg-red-600 hover:bg-red-700 px-8 py-3">
              <Link href="/products">Our Product</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-3"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Get In Touch Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            GET IN <span className="text-red-600">TOUCH</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Phone className="w-8 h-8 text-red-600 mr-3" />
                <h3 className="text-xl font-semibold text-red-600">Contact Us</h3>
              </div>
              <p>Telp & Fax : {settings.company_phone}</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-red-600 mr-3" />
                <h3 className="text-xl font-semibold text-red-600">Our Location</h3>
              </div>
              <p>{settings.company_address}</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-red-600 mr-3" />
                <h3 className="text-xl font-semibold text-red-600">Email</h3>
              </div>
              <p>{settings.company_email}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src={settings.home_secondary_image_url}
              alt="Company Information"
              width={600}
              height={400}
              className="rounded-lg"
              unoptimized={settings.home_secondary_image_url?.startsWith('/')}
            />
            <div className="bg-red-600 text-white p-4 mt-4 rounded">
              <h3 className="text-xl font-bold">{settings.home_company_info_title}</h3>
            </div>
          </div>

          <div>
            <p className="text-red-600 text-sm mb-2">CV. PRIMADONA & CO</p>
            <h2 className="text-4xl font-bold mb-6">
              THE BEST
              <br />
              <span className="text-red-600">SOLUTION</span>
              <br />
              FOR YOU
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                  Quality
                </h3>
                <p className="text-gray-300">
                  CV Primadona and Co has built a strong reputation in the industry for 26 years. They specialize in
                  producing high quality hardwood charcoal.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                  Our Product
                </h3>
                <ul className="text-gray-300 space-y-1">
                  <li>• Indoor</li>
                  <li>• Outdoor BBQ</li>
                  <li>• Industrial purpose</li>
                </ul>
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
