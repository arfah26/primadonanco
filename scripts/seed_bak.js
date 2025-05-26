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

    products: [
      {
        name: "Kachi Charcoal",
        description:
          "High quality kachi charcoal made from premium hardwood. Perfect for industrial and cooking purposes with excellent burning properties and long-lasting heat.",
        image: "/placeholder.svg?height=300&width=300",
        category: "premium",
        price: 150.0,
        stock: 100,
        status: "active",
      },
      {
        name: "Broken Kachi Charcoal",
        description:
          "Broken pieces of kachi charcoal, ideal for various heating applications. Maintains the same quality as whole kachi charcoal with easier handling.",
        image: "/placeholder.svg?height=300&width=300",
        category: "standard",
        price: 120.0,
        stock: 200,
        status: "active",
      },
      {
        name: "Lump Charcoal",
        description:
          "Natural lump charcoal perfect for BBQ and outdoor cooking. Burns clean with minimal ash and provides authentic smoky flavor.",
        image: "/placeholder.svg?height=300&width=300",
        category: "bbq",
        price: 180.0,
        stock: 150,
        status: "active",
      },
      {
        name: "Small Broken Charcoal",
        description:
          "Small broken charcoal pieces for efficient burning and heating. Ideal for quick ignition and consistent heat distribution.",
        image: "/placeholder.svg?height=300&width=300",
        category: "standard",
        price: 100.0,
        stock: 300,
        status: "active",
      },
      {
        name: "Halaban Charcoal",
        description:
          "Premium halaban charcoal with excellent burning properties. Known for its high heat output and minimal smoke production.",
        image: "/placeholder.svg?height=300&width=300",
        category: "premium",
        price: 200.0,
        stock: 80,
        status: "active",
      },
      {
        name: "Hardwood Charcoal",
        description:
          "Superior hardwood charcoal for professional and industrial use. Provides consistent heat and burns for extended periods.",
        image: "/placeholder.svg?height=300&width=300",
        category: "industrial",
        price: 250.0,
        stock: 120,
        status: "active",
      },
    ],

    gallery: [
      {
        title: "Production Process",
        description:
          "Our state-of-the-art charcoal production facility with modern equipment and quality control systems.",
        image: "/placeholder.svg?height=400&width=600",
        category: "production",
        sort_order: 1,
        status: "active",
      },
      {
        title: "Warehouse Storage",
        description:
          "Climate-controlled storage facility ensuring product quality and safety throughout the storage period.",
        image: "/placeholder.svg?height=300&width=400",
        category: "facility",
        sort_order: 2,
        status: "active",
      },
      {
        title: "Quality Control",
        description: "Rigorous quality testing procedures to ensure every batch meets our high standards.",
        image: "/placeholder.svg?height=300&width=400",
        category: "quality",
        sort_order: 3,
        status: "active",
      },
      {
        title: "Export Packaging",
        description:
          "Professional packaging for international shipping, ensuring products arrive in perfect condition.",
        image: "/placeholder.svg?height=300&width=400",
        category: "export",
        sort_order: 4,
        status: "active",
      },
      {
        title: "Raw Materials",
        description: "Premium hardwood selection from sustainable sources, the foundation of our quality charcoal.",
        image: "/placeholder.svg?height=300&width=400",
        category: "materials",
        sort_order: 5,
        status: "active",
      },
      {
        title: "Loading Process",
        description: "Efficient loading and shipping operations for timely delivery to customers worldwide.",
        image: "/placeholder.svg?height=300&width=400",
        category: "export",
        sort_order: 6,
        status: "active",
      },
      {
        title: "Final Inspection",
        description: "Final quality inspection before packaging to ensure customer satisfaction.",
        image: "/placeholder.svg?height=300&width=400",
        category: "quality",
        sort_order: 7,
        status: "active",
      },
      {
        title: "Charcoal Samples",
        description: "Various charcoal samples showcasing different sizes and grades available.",
        image: "/placeholder.svg?height=300&width=400",
        category: "production",
        sort_order: 8,
        status: "active",
      },
    ],

    settings: [
      {
        setting_key: "company_name",
        setting_value: "CV. PRIMADONA & CO",
        setting_type: "string",
        description: "Company name displayed throughout the website",
      },
      {
        setting_key: "company_address",
        setting_value: "Jl. Garuda I no. 09 Sei Semayang Medan",
        setting_type: "string",
        description: "Company physical address",
      },
      {
        setting_key: "company_city",
        setting_value: "Medan, North Sumatra",
        setting_type: "string",
        description: "Company city and province",
      },
      {
        setting_key: "company_country",
        setting_value: "Indonesia",
        setting_type: "string",
        description: "Company country",
      },
      {
        setting_key: "company_postal_code",
        setting_value: "20351",
        setting_type: "string",
        description: "Company postal code",
      },
      {
        setting_key: "company_phone",
        setting_value: "061-8461239",
        setting_type: "string",
        description: "Company phone number",
      },
      {
        setting_key: "company_email",
        setting_value: "primadona_53@yahoo.co.id",
        setting_type: "string",
        description: "Company email address",
      },
      {
        setting_key: "company_whatsapp",
        setting_value: "+62 8126012712",
        setting_type: "string",
        description: "Company WhatsApp number",
      },
      {
        setting_key: "company_vision",
        setting_value: "Supplying best hardwood charcoal to all over the world.",
        setting_type: "text",
        description: "Company vision statement",
      },
      {
        setting_key: "company_mission",
        setting_value:
          "Produce high quality products, maintaining relationship with clients, fulfilling global demand on time and participate in improving the regional economy through empowering the surrounding community.",
        setting_type: "text",
        description: "Company mission statement",
      },
      {
        setting_key: "about_us",
        setting_value:
          "CV. PRIMADONA AND CO is a charcoal producer and exporter from North Sumatra, having been established in 1997. Located in Medan, North Sumatra, having 26 years experience in the charcoal business, CV PRIMADONA AND CO has established charcoal production in the hands of excellent good relations with buyers from all over the world, quality to customers satisfaction. We keep our product in safety environment which is all area covered.",
        setting_type: "text",
        description: "About us content",
      },
      {
        setting_key: "established_year",
        setting_value: "1997",
        setting_type: "string",
        description: "Year company was established",
      },
      {
        setting_key: "experience_years",
        setting_value: "26",
        setting_type: "number",
        description: "Years of experience in business",
      },
    ],

    contacts: [
      {
        first_name: "John",
        last_name: "Smith",
        email: "john.smith@example.com",
        phone: "+1-555-0123",
        subject: "Product Inquiry",
        message:
          "Hello, I am interested in your premium charcoal products for our restaurant chain. Could you please provide more information about bulk pricing and delivery options?",
        status: "new",
        ip_address: "192.168.1.100",
      },
      {
        first_name: "Maria",
        last_name: "Garcia",
        email: "maria.garcia@example.com",
        phone: "+34-600-123456",
        subject: "Export to Spain",
        message:
          "We are a distributor in Spain looking for reliable charcoal suppliers. We are interested in establishing a long-term partnership for regular shipments.",
        status: "read",
        ip_address: "85.155.23.45",
      },
      {
        first_name: "Ahmed",
        last_name: "Hassan",
        email: "ahmed.hassan@example.com",
        phone: "+971-50-1234567",
        subject: "BBQ Charcoal Order",
        message:
          "I need high-quality BBQ charcoal for my restaurant in Dubai. Please send me your catalog and pricing information.",
        status: "replied",
        ip_address: "185.3.135.22",
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

    // Seed products
    console.log("📦 Seeding products...")
    for (const product of seedData.products) {
      const [existing] = await pool.execute("SELECT id FROM products WHERE name = ?", [product.name])

      if (existing.length === 0) {
        await pool.execute(
          "INSERT INTO products (name, description, image, category, price, stock, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            product.name,
            product.description,
            product.image,
            product.category,
            product.price,
            product.stock,
            product.status,
          ],
        )
        console.log(`✅ Created product: ${product.name}`)
      } else {
        console.log(`⏭️  Product already exists: ${product.name}`)
      }
    }

    // Seed gallery
    console.log("🖼️  Seeding gallery...")
    for (const image of seedData.gallery) {
      const [existing] = await pool.execute("SELECT id FROM gallery WHERE title = ?", [image.title])

      if (existing.length === 0) {
        await pool.execute(
          "INSERT INTO gallery (title, description, image, category, sort_order, status) VALUES (?, ?, ?, ?, ?, ?)",
          [image.title, image.description, image.image, image.category, image.sort_order, image.status],
        )
        console.log(`✅ Created gallery image: ${image.title}`)
      } else {
        console.log(`⏭️  Gallery image already exists: ${image.title}`)
      }
    }

    // Seed settings
    console.log("⚙️  Seeding settings...")
    for (const setting of seedData.settings) {
      const [existing] = await pool.execute("SELECT id FROM settings WHERE setting_key = ?", [setting.setting_key])

      if (existing.length === 0) {
        await pool.execute(
          "INSERT INTO settings (setting_key, setting_value, setting_type, description) VALUES (?, ?, ?, ?)",
          [setting.setting_key, setting.setting_value, setting.setting_type, setting.description],
        )
        console.log(`✅ Created setting: ${setting.setting_key}`)
      } else {
        console.log(`⏭️  Setting already exists: ${setting.setting_key}`)
      }
    }

    // Seed sample contacts
    console.log("📧 Seeding sample contacts...")
    for (const contact of seedData.contacts) {
      const [existing] = await pool.execute("SELECT id FROM contacts WHERE email = ?", [contact.email])

      if (existing.length === 0) {
        await pool.execute(
          "INSERT INTO contacts (first_name, last_name, email, phone, subject, message, status, ip_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            contact.first_name,
            contact.last_name,
            contact.email,
            contact.phone,
            contact.subject,
            contact.message,
            contact.status,
            contact.ip_address,
          ],
        )
        console.log(`✅ Created contact: ${contact.email}`)
      } else {
        console.log(`⏭️  Contact already exists: ${contact.email}`)
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
      "order_items",
      "orders",
      "sessions",
      "analytics",
      "contacts",
      "gallery",
      "products",
      "settings",
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
