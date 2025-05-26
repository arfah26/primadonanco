"use client" // Required for useEffect and useState

import Image from "next/image"
import { useState, useEffect } from "react"

export default function AboutPage() {
  const [settings, setSettings] = useState({
    company_name: "CV.PRIMADONA & CO",
    company_slogan: "PRODUCER & EXPORTER CHARCOAL",
    company_address: "Jl.Garuda I no. 09 Sei Semayang Medan",
    company_phone: "061-8461239",
    company_email: "primadona_53@yahoo.co.id",
    company_vision: "Loading vision...",
    company_mission: "Loading mission...",
    about_us: "Loading about us information...",
    about_us_image: "/placeholder.svg?height=300&width=400",
    about_us_video_embed_url: "",
    about_page_hero_image_url: "/placeholder.svg?height=400&width=1920",
    aboutUsSecondaryText: "",
    aboutUsTertiaryText: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true;

    const fetchSettings = async () => {
      console.log("AboutPage: fetchSettings started (Restored Logic).");
      if (isMounted && !loading) setLoading(true); // Redundant if loading starts true, but safe
      console.log("AboutPage: setLoading(true) potentially called.");

      try {
        const response = await fetch("/api/settings");
        console.log("AboutPage: fetch completed, status:", response.status);

        if (!response.ok) {
          console.error(`AboutPage: API request failed with status ${response.status}`);
          if (isMounted) setSettings(prev => ({...prev, company_vision: "Error loading vision.", company_mission: "Error loading mission.", about_us: "Error loading content."}));
          return;
        }

        const data = await response.json();
        // Log the entire data object received from the API
        console.log("About Page: Data received from /api/settings:", JSON.stringify(data, null, 2)); 
        console.log("AboutPage: response.json() completed, data.success:", data.success);

        if (data.success && data.data) {
          if (isMounted) {
            setSettings((prevSettings) => ({ ...prevSettings, ...data.data }));
            console.log("AboutPage: setSettings called with new data.");
          }
        } else {
          console.error("AboutPage: API request successful but data.success is false or data.data is missing. Error:", data.error || "No data returned");
          if (isMounted) setSettings(prev => ({...prev, company_vision: "Failed to load vision.", company_mission: "Failed to load mission.", about_us: "Failed to load content."}));
        }
      } catch (error) {
        console.error("AboutPage: Error in fetchSettings catch block:", error);
        if (isMounted) setSettings(prev => ({...prev, company_vision: "Exception loading vision.", company_mission: "Exception loading mission.", about_us: "Exception loading content."}));
      } finally {
        if (isMounted) {
          setLoading(false);
          console.log("AboutPage: setLoading(false) called in finally (Restored Logic).");
        }
      }
    }

    fetchSettings();

    return () => {
      isMounted = false;
      console.log("AboutPage: useEffect cleanup, isMounted set to false.");
    };
  }, []) // Empty dependency array to run only on mount

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Loading page content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${settings.about_page_hero_image_url || "/placeholder.svg?height=400&width=1920"}')`,
            filter: "brightness(0.4)",
          }}
        />
        <div className="relative z-10 text-center">
          <div className="bg-red-600 text-white p-4 rounded mb-4 inline-block">
            <span className="text-2xl font-bold">
              <Image
                    src="/Primadona_512.png"
                    alt="Company Facility"
                    width={20}
                    height={20}
                    className="rounded"
                    unoptimized // disables Next.js image optimization (use only for static/local images)
              /> {settings.company_name || "PRIMADONA & CO"}
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4">{settings.company_name || "CV.PRIMADONA & CO"}</h1>
          <p className="text-xl">{settings.company_slogan || "PRODUCER & EXPORTER CHARCOAL"}</p>

          <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-red-600 mr-2">📍</span>
                <span>{settings.company_address || "Jl.Garuda I no. 09 Sei Semayang Medan"}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-red-600 mr-2">📞</span>
                <span>Contact Us</span>
              </div>
              <p className="text-sm">Telp & Fax : {settings.company_phone || "061-8461239"}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-red-600 mr-2">📧</span>
                <span>Email Us</span>
              </div>
              <p className="text-sm">{settings.company_email || "primadona_53@yahoo.co.id"}</p>
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
              <p className="text-gray-300">{settings.company_vision}</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-red-600">Mission</span>
            </h2>
            <div className="border-l-4 border-red-600 pl-6">
              <p className="text-gray-300">{settings.company_mission}</p>
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
                  src={settings.about_us_image || "/placeholder.svg?height=300&width=400"}
                  alt="Company Facility"
                  width={400}
                  height={300}
                  className="rounded"
                  unoptimized={settings.about_us_image?.startsWith('/')}
                />
              </div>
            </div>

            <div>
              <p className="text-gray-300 leading-relaxed mb-6">
                {settings.about_us}
              </p>
              {settings.aboutUsSecondaryText && (
                <p className="text-gray-300 leading-relaxed mb-6">
                  {settings.aboutUsSecondaryText}
                </p>
              )}
              {settings.aboutUsTertiaryText && (
                <p className="text-gray-300 leading-relaxed">
                  {settings.aboutUsTertiaryText}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-black rounded-lg p-8">
            {settings.about_us_video_embed_url ? (
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={settings.about_us_video_embed_url}
                  title="Company Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">▶️</span>
                  </div>
                  <p className="text-gray-400">{settings.company_name || "CV PRIMADONA & CO"}</p>
                  <p className="text-sm text-gray-500">Company Video Not Available</p>
                </div>
              </div>
            )}
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
              { name: "Middle East (Saudi Arabia)", code: "sa" },
              { name: "South Korea", code: "kr" },
              { name: "Taiwan", code: "tw" },
              { name: "Italia", code: "it" },
              { name: "Turkey", code: "tr" },
              { name: "Australia", code: "au" },
            ].map((country, index) => (
              <div key={index} className="text-center">
                <img
                  src={`https://flagcdn.com/w80/${country.code}.png`}
                  alt={`${country.name} Flag`}
                  className="mx-auto mb-2 w-14 h-auto rounded shadow"
                />
                <p className="font-medium">{country.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
