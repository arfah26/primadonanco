"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle, RefreshCw } from "lucide-react"

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [showDebug, setShowDebug] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log("Attempting login with:", { username: credentials.username })

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })

      console.log("Response status:", response.status)
      const data = await response.json()
      console.log("Response data:", data)

      if (data.success) {
        toast({
          title: "Success!",
          description: "Login successful",
        })
        router.push("/admin")
      } else {
        toast({
          title: "Login Failed",
          description: data.error || "Invalid username or password",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Error",
        description: "Login failed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fillDemoCredentials = () => {
    setCredentials({ username: "admin", password: "admin123" })
  }

  const testConnection = async () => {
    try {
      const response = await fetch("/api/products")
      const data = await response.json()
      console.log("Database connection test:", data)

      toast({
        title: data.success ? "Database Connected" : "Database Error",
        description: data.success ? "Database is working" : "Database connection failed",
        variant: data.success ? "default" : "destructive",
      })
    } catch (error) {
      console.error("Connection test failed:", error)
      toast({
        title: "Connection Test Failed",
        description: "Could not test database connection",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
                placeholder="Enter username"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                placeholder="Enter password"
              />
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* <div className="mt-6 space-y-4">
            <div className="border-t pt-4 space-y-2">
              <Button type="button" variant="outline" className="w-full" onClick={fillDemoCredentials}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Fill Demo Credentials
              </Button>

              <Button type="button" variant="outline" className="w-full" onClick={testConnection}>
                Test Database Connection
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800">Default Credentials:</p>
                  <p className="text-blue-700">
                    Username: <code className="bg-blue-100 px-1 rounded">admin</code>
                  </p>
                  <p className="text-blue-700">
                    Password: <code className="bg-blue-100 px-1 rounded">admin123</code>
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowDebug(!showDebug)}
              className="w-full text-xs"
            >
              {showDebug ? "Hide" : "Show"} Debug Info
            </Button>

            {showDebug && (
              <div className="bg-gray-50 border rounded-lg p-3 text-xs">
                <p className="font-medium mb-2">Troubleshooting Steps:</p>
                <ol className="list-decimal list-inside space-y-1 text-gray-600">
                  <li>Check browser console for errors</li>
                  <li>Test database connection above</li>
                  <li>Verify .env.local file exists</li>
                  <li>
                    Run: <code className="bg-gray-200 px-1 rounded">npm run db:users</code>
                  </li>
                  <li>
                    Run: <code className="bg-gray-200 px-1 rounded">npm run seed</code> if needed
                  </li>
                </ol>

                <div className="mt-3 pt-2 border-t">
                  <p className="font-medium mb-1">Current Values:</p>
                  <p>Username: {credentials.username || "empty"}</p>
                  <p>Password: {credentials.password ? "***" : "empty"}</p>
                </div>
              </div>
            )}
          </div> */}
        </CardContent>
      </Card>
    </div>
  )
}
