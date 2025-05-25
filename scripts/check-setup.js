const { testConnection } = require("../lib/db-config")

async function checkSetup() {
  console.log("🔍 Checking database setup...")

  // Load environment variables
  require("dotenv").config({ path: ".env.local" })

  // Check environment variables
  const requiredEnvVars = ["DB_PASSWORD", "DB_NAME"]
  const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName])

  if (missingEnvVars.length > 0) {
    console.error("❌ Missing environment variables:", missingEnvVars.join(", "))
    console.log("💡 Please create a .env.local file with the required variables")
    return false
  }

  // Test database connection
  const isConnected = await testConnection()

  if (isConnected) {
    console.log("✅ Database setup is correct!")
    return true
  } else {
    console.error("❌ Database connection failed")
    console.log("💡 Please check your database credentials and server status")
    return false
  }
}

checkSetup()
