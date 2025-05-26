const { getPool, testConnection } = require("../lib/db-config")
const bcrypt = require("bcryptjs")

async function createSeedData() {
  const hashedAdminPassword = await bcrypt.hash("jaKart4#!@2025!", 10)
  const hashedEditorPassword = await bcrypt.hash("jaKart4#!@2025!", 10)

  return {
    users: [
      {
        username: "admin",
        email: "admin@primadona.co.id",
        password: hashedAdminPassword,
        role: "admin",
      },
      {
        username: "editor",
        email: "editor@primadona.co.id",
        password: hashedEditorPassword,
        role: "editor",
      },
    ],
  }
}

async function seedDatabase() {
  console.log("🌱 Starting database seeding...")

  // Load environment variables
  require("dotenv").config({ path: ".env.local" })

  // Test connection first
  const isConnected = await testConnection()
  if (!isConnected) {
    console.error("❌ Cannot connect to database. Please check your connection.")
    process.exit(1)
  }

  const pool = getPool()
  const seedData = await createSeedData()

  try {
    // Seed users
    console.log("👥 Seeding users...")
    for (const user of seedData.users) {
      const [existing] = await pool.execute("SELECT id FROM users WHERE username = ? OR email = ?", [
        user.username,
        user.email,
      ])

      if (existing.length === 0) {
        await pool.execute("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)", [
          user.username,
          user.email,
          user.password,
          user.role,
        ])
        console.log(`✅ Created user: ${user.username}`)
      } else {
        console.log(`⏭️  User already exists: ${user.username}`)
      }
    }

    console.log("🎉 Database seeding completed successfully!")
  } catch (error) {
    console.error("❌ Seeding failed:", error.message)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

async function clearDatabase() {
  console.log("🗑️  Clearing database...")

  // Load environment variables
  require("dotenv").config({ path: ".env.local" })

  const pool = getPool()

  try {
    // Disable foreign key checks
    await pool.execute("SET FOREIGN_KEY_CHECKS = 0")

    // Clear all tables
    const tables = [
      "users",
    ]

    for (const table of tables) {
      await pool.execute(`TRUNCATE TABLE ${table}`)
      console.log(`✅ Cleared table: ${table}`)
    }

    // Re-enable foreign key checks
    await pool.execute("SET FOREIGN_KEY_CHECKS = 1")

    console.log("🎉 Database cleared successfully!")
  } catch (error) {
    console.error("❌ Clear failed:", error.message)
    throw error
  } finally {
    await pool.end()
  }
}

// Command line interface
const command = process.argv[2]

if (command === "seed") {
  seedDatabase()
} else if (command === "clear") {
  clearDatabase()
} else if (command === "fresh") {
  clearDatabase().then(() => seedDatabase())
} else {
  console.log("Usage:")
  console.log("  node scripts/seed.js seed   # Seed the database with sample data")
  console.log("  node scripts/seed.js clear  # Clear all data from database")
  console.log("  node scripts/seed.js fresh  # Clear and then seed the database")
  process.exit(1)
}
