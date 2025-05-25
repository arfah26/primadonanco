"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      const data = await response.json()
      if (data.success) {
        setProducts(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ["all", "premium", "standard", "bbq", "industrial"]

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((p) => p.category === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold mb-8">
            OUR <span className="text-red-600">PRODUCT</span>
          </h1>
          <p className="text-lg mb-12 max-w-3xl mx-auto">
            Charcoal is a versatile material that has been used for centuries. It can be made from a variety of sources
            such as wood, coconut shells, or peat. Charcoal is used for a wide range of purposes including fuel for
            cooking and heating, art and drawing, water filtration, and even in medicine.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-red-600 hover:bg-red-700" : ""}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>

          {/* Large CHARCOAL text background */}
          <div className="relative mb-16">
            <h2 className="text-8xl md:text-9xl font-bold text-gray-800 opacity-20 select-none">CHARCOAL</h2>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="bg-gray-900 border-gray-700 text-white hover:border-red-600 transition-colors"
              >
                <CardHeader>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <Badge variant="secondary" className="bg-red-600 text-white">
                      {product.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 mb-4">{product.description}</CardDescription>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-red-600">${product.price}</span>
                    <span className="text-sm text-gray-400">Stock: {product.stock}</span>
                  </div>
                  <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">Contact for Quote</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Get in touch section */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">
          Get in touch <span className="text-red-600">with us?</span>
        </h2>
        <div className="flex justify-center gap-4">
          <Button className="bg-red-600 hover:bg-red-700">📧</Button>
          <Button className="bg-green-600 hover:bg-green-700">📱</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">✈️</Button>
        </div>
      </section>
    </div>
  )
}
