const { testConnection, findMany } = require("../lib/db-config")

async function checkUsers() {
  console.log("🔍 Checking database users...")

  // Load environment variables
  require("dotenv").config({ path: ".env.local" })

  // Test connection first
  const isConnected = await testConnection()
  if (!isConnected) {
    console.error("❌ Cannot connect to database. Please check your connection.")
    process.exit(1)
  }

  try {
    // Check if users table exists and has data
    const usersResult = await findMany("SELECT username, email, role, created_at FROM users")

    if (usersResult.success) {
      console.log("✅ Users table found")
      console.log("📊 Total users:", usersResult.data.length)

      if (usersResult.data.length > 0) {
        console.log("\n👥 Existing users:")
        usersResult.data.forEach((user) => {
          console.log(`  - ${user.username} (${user.email}) - Role: ${user.role}`)
        })
      } else {
        console.log("⚠️  No users found in database")
        console.log("💡 Run 'npm run seed' to create default users")
      }
    } else {
      console.error("❌ Users table not found or query failed")
      console.log("💡 Run 'npm run migrate' to create tables")
    }

    // Check if migrations table exists
    const migrationsResult = await findMany("SELECT migration_name FROM migrations ORDER BY executed_at DESC LIMIT 5")

    if (migrationsResult.success) {
      console.log("\n📋 Recent migrations:")
      migrationsResult.data.forEach((migration) => {
        console.log(`  - ${migration.migration_name}`)
      })
    }
  } catch (error) {
    console.error("❌ Error checking database:", error.message)
  }
}

checkUsers()
