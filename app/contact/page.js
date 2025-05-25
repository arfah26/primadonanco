"use client"

import { useState } from "react"
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
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

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

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <section className="py-20 px-4 text-center bg-black text-white">
        <h1 className="text-6xl font-bold">
          CONTACT <span className="text-red-600">US</span>
        </h1>
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
              <p className="text-2xl font-bold">📞 061-8461239</p>
            </div>

            <div>
              <Button className="bg-red-600 hover:bg-red-700 text-white mb-4">Visit Us</Button>
              <p className="text-lg font-semibold">📍 Jl.Garuda I no. 09 Sei Semayang Medan.</p>
            </div>

            <div>
              <Button className="bg-red-600 hover:bg-red-700 text-white mb-4">Live Chat</Button>
              <p className="text-2xl font-bold">📱 +62 8126012712</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-600">
              <p className="text-lg">📍 Map Location</p>
              <p className="text-sm">
                Jl. Garuda I, Medan Krio, Kec. Sunggal, Kabupaten Deli Serdang, Sumatera Utara 20351
              </p>
              <p className="text-sm mt-2">Interactive map would be embedded here</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
