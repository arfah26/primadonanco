"use client"

import { useState, useEffect } from "react"
import Image from "next/image" // Standard import
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [settings, setSettings] = useState({
    company_phone: "061-8461239",
    company_address: "Jl.Garuda I no. 09 Sei Semayang Medan.",
    company_whatsapp: "+62 8126012712",
    map_address_line1: "Jl. Garuda I, Medan Krio, Kec. Sunggal, Kabupaten Deli Serdang, Sumatera Utara 20351",
    map_embed_url: "",
    contact_page_hero_image_url: "/placeholder.svg?height=400&width=1920" // Added default for hero
  })
  const [loading, setLoading] = useState(false) // For form submission
  const [pageLoading, setPageLoading] = useState(true) // For initial page content
  const { toast } = useToast()

  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        setPageLoading(true) // Ensure it's true at the start of fetch
        const response = await fetch("/api/settings")
        const data = await response.json()
        console.log("Contact Page: Data received from /api/settings:", data); // Log received data
        if (data.success && data.data) {
          setSettings((prevSettings) => ({ ...prevSettings, ...data.data }))
        } else {
          console.error("Failed to fetch settings for contact page:", data.error || "No data returned")
        }
      } catch (error) {
        console.error("Error fetching settings for contact page:", error)
      } finally {
        setPageLoading(false)
      }
    }
    fetchSettingsData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (data.success) {
        toast({
          title: "Success!",
          description: data.message,
        })
        setFormData({ firstName: "", email: "", phone: "", message: "" })
      } else {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Loading contact information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section 
        className="relative h-96 flex items-center justify-center text-white bg-black"
      >
        {settings.contact_page_hero_image_url && (
          <Image // This is the next/image component
            src={settings.contact_page_hero_image_url}
            alt="Contact Us Hero"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
            style={{ filter: "brightness(0.6)" }}
            unoptimized={settings.contact_page_hero_image_url?.startsWith('/')}
          />
        )}
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold">
            CONTACT <span className="text-red-600">US</span>
          </h1>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+62"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message..."
                  rows={5}
                  className="mt-1"
                  required
                />
                <div className="text-right text-sm text-gray-500 mt-1">{formData.message.length}/500</div>
              </div>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-8" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <Button className="bg-red-600 hover:bg-red-700 text-white mb-4">Call Us</Button>
              <p className="text-2xl font-bold">📞 {settings.company_phone}</p>
            </div>
            <div>
              <Button className="bg-red-600 hover:bg-red-700 text-white mb-4">Visit Us</Button>
              <p className="text-lg font-semibold">📍 {settings.company_address}</p>
            </div>
            <div>
              <Button className="bg-red-600 hover:bg-red-700 text-white mb-4">Live Chat</Button>
              <p className="text-2xl font-bold">📱 {settings.company_whatsapp}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center p-4">
            {settings.map_embed_url ? (
              <iframe
                src={settings.map_embed_url}
                width="100%"
                height="100%"
                style={{ border:0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            ) : (
              <div className="text-center text-gray-600">
                <p className="text-lg">📍 Map Location</p>
                <p className="text-sm">
                  {settings.map_address_line1 || settings.company_address}
                </p>
                <p className="text-sm mt-2">Interactive map would be embedded here if URL is provided in settings.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
