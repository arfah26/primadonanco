// Helper script to install required dependencies
const { execSync } = require("child_process")

console.log("📦 Installing required dependencies...")

try {
  // Install MySQL and bcrypt dependencies
  execSync("npm install mysql2@^3.6.5 bcryptjs@^2.4.3", { stdio: "inherit" })
  console.log("✅ Dependencies installed successfully!")

  console.log("\n📋 Available scripts:")
  console.log("  npm run migrate     - Run database migrations")
  console.log("  npm run seed        - Seed database with sample data")
  console.log("  npm run db:setup    - Run migrations and seed data")
  console.log("  npm run seed:fresh  - Clear and reseed database")
} catch (error) {
  console.error("❌ Failed to install dependencies:", error.message)
  process.exit(1)
}
