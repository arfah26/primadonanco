"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Trash2, Plus, BarChart3, Users, Package, ImageIcon } from "lucide-react"

export default function AdminPage() {
  const [products, setProducts] = useState([])
  const [gallery, setGallery] = useState([])
  const [contacts, setContacts] = useState([])
  const [analytics, setAnalytics] = useState({
    totalVisits: 0,
    totalProducts: 0,
    totalContacts: 0,
    totalGalleryImages: 0,
    monthlyVisits: {},
  })
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Helper function for file uploads
  const handleFileUpload = async (event, fieldName, stateSetter) => {
    const file = event.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {
      // Show a loading toast
      const uploadToast = toast({ title: "Uploading...", description: "Please wait while the file is being uploaded." })
      
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      // Dismiss loading toast
      if (uploadToast && uploadToast.dismiss) {
        uploadToast.dismiss()
      } else if (typeof uploadToast === 'function') { // For older toast versions that return a dismiss function
        uploadToast();
      }


      const data = await response.json()

      if (data.success) {
        stateSetter(data.path) // Update the state with the returned path
        toast({ title: "Success!", description: "File uploaded successfully. Path: " + data.path })
      } else {
        toast({ title: "Upload Error", description: data.error || "Failed to upload file.", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Upload Error", description: "An error occurred during upload.", variant: "destructive" })
      console.error("File upload error:", error)
       // Dismiss loading toast on error too
      if (typeof uploadToast === 'function') uploadToast(); // Check if it's a function before calling
    }
  }

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    image: "",
    category: "standard",
    // price: 0,
    // stock: 0,
  })

  const [newGalleryImage, setNewGalleryImage] = useState({
    title: "",
    description: "",
    image: "",
    category: "production",
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [productsRes, galleryRes, contactsRes, analyticsRes, settingsRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/gallery"),
        fetch("/api/contact"),
        fetch("/api/analytics"),
        fetch("/api/settings"),
      ])

      const [productsData, galleryData, contactsData, analyticsData, settingsData] = await Promise.all([
        productsRes.json(),
        galleryRes.json(),
        contactsRes.json(),
        analyticsRes.json(),
        settingsRes.json(),
      ])

      if (productsData.success) setProducts(productsData.data || [])
      if (galleryData.success) setGallery(galleryData.data || [])
      if (contactsData.success) setContacts(contactsData.data || [])
      if (analyticsData.success)
        setAnalytics(
          analyticsData.data || {
            totalVisits: 0,
            totalProducts: 0,
            totalContacts: 0,
            totalGalleryImages: 0,
            monthlyVisits: {},
          },
        )
      if (settingsData.success) setSettings(settingsData.data || {})
    } catch (error) {
      console.error("Failed to fetch data:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const addProduct = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      })

      const data = await response.json()

      if (data.success) {
        setProducts([...products, data.data])
        // setNewProduct({ name: "", description: "", image: "", category: "standard", price: 0, stock: 0 })
        setNewProduct({ name: "", description: "", image: "", category: "standard" })
        toast({ title: "Success!", description: "Product added successfully" })
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to add product", variant: "destructive" })
    }
  }

  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const response = await fetch(`/api/products/${id}`, { method: "DELETE" })
      const data = await response.json()

      if (data.success) {
        setProducts(products.filter((p) => p.id !== id))
        toast({ title: "Success!", description: "Product deleted successfully" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete product", variant: "destructive" })
    }
  }

  const addGalleryImage = async () => {
    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGalleryImage),
      })

      const data = await response.json()

      if (data.success) {
        setGallery([...gallery, data.data])
        setNewGalleryImage({ title: "", description: "", image: "", category: "production" })
        toast({ title: "Success!", description: "Image added successfully" })
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to add image", variant: "destructive" })
    }
  }

  const deleteGalleryImage = async (id) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    try {
      const response = await fetch(`/api/gallery/${id}`, { method: "DELETE" })
      const data = await response.json()

      if (data.success) {
        setGallery(gallery.filter((img) => img.id !== id))
        toast({ title: "Success!", description: "Image deleted successfully" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete image", variant: "destructive" })
    }
  }

  const updateSettings = async () => {
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      const data = await response.json()

      if (data.success) {
        toast({ title: "Success!", description: "Settings updated successfully" })
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update settings", variant: "destructive" })
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalVisits || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalProducts || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalContacts || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gallery Images</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalGalleryImages || 0}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="products">Products</TabsTrigger>
            {/* <TabsTrigger value="gallery">Gallery</TabsTrigger> */}
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Product
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  >
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="bbq">BBQ</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>
                <Textarea
                  placeholder="Product Description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium mb-1">Product Image</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'image', (path) => setNewProduct(prev => ({ ...prev, image: path })))}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                    />
                    {newProduct.image && <img src={newProduct.image} alt="Product preview" className="mt-2 h-20 rounded" />}
                  </div>
                  {/* <Input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                  /> */}
                  {/* <Input
                    type="number"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                  /> */}
                </div>
                <Button onClick={addProduct} className="bg-red-600 hover:bg-red-700">
                  Add Product
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Products ({products.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.isArray(products) &&
                    products.map((product) => (
                      <div key={product.id} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold">{product.name}</h3>
                          <Badge variant="secondary">{product.category}</Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                        <div className="flex justify-between items-center mb-2">
                          {/* <span className="font-semibold">${product.price}</span>
                          <span className="text-sm text-gray-500">Stock: {product.stock}</span> */}
                        </div>
                        <Button
                          onClick={() => deleteProduct(product.id)}
                          variant="destructive"
                          size="sm"
                          className="w-full"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    ))}
                </div>
                {(!Array.isArray(products) || products.length === 0) && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No products found.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Gallery Image
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Image Title"
                    value={newGalleryImage.title}
                    onChange={(e) => setNewGalleryImage({ ...newGalleryImage, title: e.target.value })}
                  />
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newGalleryImage.category}
                    onChange={(e) => setNewGalleryImage({ ...newGalleryImage, category: e.target.value })}
                  >
                    <option value="production">Production</option>
                    <option value="facility">Facility</option>
                    <option value="quality">Quality</option>
                    <option value="export">Export</option>
                    <option value="materials">Materials</option>
                  </select>
                </div>
                <Textarea
                  placeholder="Image Description"
                  value={newGalleryImage.description}
                  onChange={(e) => setNewGalleryImage({ ...newGalleryImage, description: e.target.value })}
                />
                <div>
                  <label className="block text-sm font-medium mb-1">Gallery Image</label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'image', (path) => setNewGalleryImage(prev => ({ ...prev, image: path })))}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                  />
                  {newGalleryImage.image && <img src={newGalleryImage.image} alt="Gallery preview" className="mt-2 h-20 rounded" />}
                </div>
                <Button onClick={addGalleryImage} className="bg-red-600 hover:bg-red-700">
                  Add Image
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gallery Images ({gallery.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array.isArray(gallery) &&
                    gallery.map((image) => (
                      <div key={image.id} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-sm">{image.title}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {image.category}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-xs mb-2">{image.description}</p>
                        <Button
                          onClick={() => deleteGalleryImage(image.id)}
                          variant="destructive"
                          size="sm"
                          className="w-full"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    ))}
                </div>
                {(!Array.isArray(gallery) || gallery.length === 0) && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No gallery images found.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages ({contacts.length})</CardTitle>
                <CardDescription>Messages from website visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.isArray(contacts) &&
                    contacts.map((contact) => (
                      <div key={contact.id} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold">{contact.first_name || contact.firstName}</h3>
                            <p className="text-sm text-gray-600">{contact.email}</p>
                            {contact.phone && <p className="text-sm text-gray-600">{contact.phone}</p>}
                          </div>
                          <div className="text-right">
                            <Badge variant={contact.status === "new" ? "default" : "secondary"}>{contact.status}</Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(contact.created_at || contact.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700">{contact.message}</p>
                      </div>
                    ))}
                  {(!Array.isArray(contacts) || contacts.length === 0) && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No contact messages yet.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Edit Page Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6"> {/* Increased spacing */}
                {/* Text Content */}
                <div>
                  <label className="block text-sm font-medium mb-1">Company Vision</label>
                  <Textarea
                    value={settings.company_vision || ""}
                    onChange={(e) => setSettings({ ...settings, company_vision: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company Mission</label>
                  <Textarea
                    value={settings.company_mission || ""}
                    onChange={(e) => setSettings({ ...settings, company_mission: e.target.value })}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">About Us Main Content</label>
                  <Textarea
                    value={settings.about_us || ""}
                    onChange={(e) => setSettings({ ...settings, about_us: e.target.value })}
                    rows={6}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Gallery Page Description</label>
                  <Textarea
                    value={settings.gallery_page_description || ""}
                    onChange={(e) => setSettings({ ...settings, gallery_page_description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Homepage Hero Title (can include HTML like <br />)</label>
                  <Textarea
                    value={settings.home_hero_title || ""}
                    onChange={(e) => setSettings({ ...settings, home_hero_title: e.target.value })}
                    rows={3}
                  />
                </div>
                 <div>
                  <label className="block text-sm font-medium mb-1">Homepage Company Info Section Title</label>
                  <Input
                    value={settings.home_company_info_title || ""}
                    onChange={(e) => setSettings({ ...settings, home_company_info_title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">About Us Video Embed URL (e.g., YouTube embed link)</label>
                  <Input
                    type="url"
                    placeholder="https://www.youtube.com/embed/VIDEO_ID"
                    value={settings.about_us_video_embed_url || ""}
                    onChange={(e) => setSettings({ ...settings, about_us_video_embed_url: e.target.value })}
                  />
                </div>

                {/* Image Uploads for Content Tab */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Homepage Hero Background Image</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'home_hero_background_url', (path) => setSettings(prev => ({ ...prev, home_hero_background_url: path })))}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                    />
                    {settings.home_hero_background_url && <img src={settings.home_hero_background_url} alt="Hero preview" className="mt-2 h-20 rounded object-cover" />}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Homepage Secondary Image (Company Info Section)</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'home_secondary_image_url', (path) => setSettings(prev => ({ ...prev, home_secondary_image_url: path })))}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                    />
                    {settings.home_secondary_image_url && <img src={settings.home_secondary_image_url} alt="Secondary image preview" className="mt-2 h-20 rounded object-cover" />}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">About Us Page Image</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'about_us_image', (path) => setSettings(prev => ({ ...prev, about_us_image: path })))}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                    />
                    {settings.about_us_image && <img src={settings.about_us_image} alt="About Us image preview" className="mt-2 h-20 rounded object-cover" />}
                  </div>
                  {/* Inserting the missing About Page Hero Image input */}
                  <div>
                    <label className="block text-sm font-medium mb-1">About Page Hero Image</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'about_page_hero_image_url', (path) => setSettings(prev => ({ ...prev, about_page_hero_image_url: path })))}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                    />
                    {settings.about_page_hero_image_url && <img src={settings.about_page_hero_image_url} alt="About hero preview" className="mt-2 h-20 rounded object-cover" />}
                  </div>
                  {/* Page Specific Hero Images Continued */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact Page Hero Image</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'contact_page_hero_image_url', (path) => setSettings(prev => ({ ...prev, contact_page_hero_image_url: path })))}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                    />
                    {settings.contact_page_hero_image_url && <img src={settings.contact_page_hero_image_url} alt="Contact hero preview" className="mt-2 h-20 rounded object-cover" />}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Gallery Page Hero Image</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'gallery_page_hero_image_url', (path) => setSettings(prev => ({ ...prev, gallery_page_hero_image_url: path })))}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                    />
                    {settings.gallery_page_hero_image_url && <img src={settings.gallery_page_hero_image_url} alt="Gallery hero preview" className="mt-2 h-20 rounded object-cover" />}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Products Page Hero Image</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'products_page_hero_image_url', (path) => setSettings(prev => ({ ...prev, products_page_hero_image_url: path })))}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                    />
                    {settings.products_page_hero_image_url && <img src={settings.products_page_hero_image_url} alt="Products hero preview" className="mt-2 h-20 rounded object-cover" />}
                  </div>
                </div>
                
                <Button onClick={updateSettings} className="bg-red-600 hover:bg-red-700 mt-6">
                  Save Content Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <Input
                      value={settings.company_name || settings.companyName || ""}
                      onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      value={settings.company_email || settings.email || ""}
                      onChange={(e) => setSettings({ ...settings, company_email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <Input
                    value={settings.company_address || settings.address || ""}
                    onChange={(e) => setSettings({ ...settings, company_address: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <Input
                      value={settings.company_city || settings.city || ""}
                      onChange={(e) => setSettings({ ...settings, company_city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Country</label>
                    <Input
                      value={settings.company_country || settings.country || ""}
                      onChange={(e) => setSettings({ ...settings, company_country: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Postal Code</label>
                    <Input
                      value={settings.company_postal_code || settings.postalCode || ""}
                      onChange={(e) => setSettings({ ...settings, company_postal_code: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input
                      value={settings.company_phone || settings.phone || ""}
                      onChange={(e) => setSettings({ ...settings, company_phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">WhatsApp</label>
                    <Input
                      value={settings.company_whatsapp || settings.whatsapp || ""}
                      onChange={(e) => setSettings({ ...settings, company_whatsapp: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={updateSettings} className="bg-red-600 hover:bg-red-700">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
