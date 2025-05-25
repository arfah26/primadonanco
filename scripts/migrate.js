const { getPool, testConnection } = require("../lib/db-config")

const migrations = [
  {
    name: "001_create_users_table",
    up: `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'editor', 'viewer') DEFAULT 'viewer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `,
    down: "DROP TABLE IF EXISTS users",
  },
  {
    name: "002_create_products_table",
    up: `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image VARCHAR(500),
        category ENUM('premium', 'standard', 'bbq', 'industrial') DEFAULT 'standard',
        price DECIMAL(10, 2) DEFAULT 0.00,
        stock INT DEFAULT 0,
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category),
        INDEX idx_status (status)
      )
    `,
    down: "DROP TABLE IF EXISTS products",
  },
  {
    name: "003_create_gallery_table",
    up: `
      CREATE TABLE IF NOT EXISTS gallery (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image VARCHAR(500) NOT NULL,
        category ENUM('production', 'facility', 'quality', 'export', 'materials') DEFAULT 'production',
        sort_order INT DEFAULT 0,
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category),
        INDEX idx_status (status),
        INDEX idx_sort_order (sort_order)
      )
    `,
    down: "DROP TABLE IF EXISTS gallery",
  },
  {
    name: "004_create_contacts_table",
    up: `
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100),
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(255),
        message TEXT NOT NULL,
        status ENUM('new', 'read', 'replied', 'closed') DEFAULT 'new',
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_email (email),
        INDEX idx_created_at (created_at)
      )
    `,
    down: "DROP TABLE IF EXISTS contacts",
  },
  {
    name: "005_create_settings_table",
    up: `
      CREATE TABLE IF NOT EXISTS settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(100) UNIQUE NOT NULL,
        setting_value TEXT,
        setting_type ENUM('string', 'text', 'number', 'boolean', 'json') DEFAULT 'string',
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_setting_key (setting_key)
      )
    `,
    down: "DROP TABLE IF EXISTS settings",
  },
  {
    name: "006_create_analytics_table",
    up: `
      CREATE TABLE IF NOT EXISTS analytics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        event_type VARCHAR(50) NOT NULL,
        event_data JSON,
        ip_address VARCHAR(45),
        user_agent TEXT,
        page_url VARCHAR(500),
        referrer VARCHAR(500),
        session_id VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_event_type (event_type),
        INDEX idx_created_at (created_at),
        INDEX idx_session_id (session_id)
      )
    `,
    down: "DROP TABLE IF EXISTS analytics",
  },
  {
    name: "007_create_orders_table",
    up: `
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(100) NOT NULL,
        customer_phone VARCHAR(20),
        customer_address TEXT,
        total_amount DECIMAL(12, 2) NOT NULL,
        status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_order_number (order_number),
        INDEX idx_status (status),
        INDEX idx_customer_email (customer_email)
      )
    `,
    down: "DROP TABLE IF EXISTS orders",
  },
  {
    name: "008_create_order_items_table",
    up: `
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        unit_price DECIMAL(10, 2) NOT NULL,
        total_price DECIMAL(12, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
        INDEX idx_order_id (order_id),
        INDEX idx_product_id (product_id)
      )
    `,
    down: "DROP TABLE IF EXISTS order_items",
  },
  {
    name: "009_create_sessions_table",
    up: `
      CREATE TABLE IF NOT EXISTS sessions (
        id VARCHAR(128) PRIMARY KEY,
        user_id INT,
        session_data TEXT,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_expires_at (expires_at)
      )
    `,
    down: "DROP TABLE IF EXISTS sessions",
  },
  {
    name: "010_create_migrations_table",
    up: `
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        migration_name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `,
    down: "DROP TABLE IF EXISTS migrations",
  },
]

async function runMigrations() {
  console.log("🚀 Starting database migrations...")

  // Load environment variables
  require("dotenv").config()

  // Test connection first
  const isConnected = await testConnection()
  if (!isConnected) {
    console.error("❌ Cannot connect to database. Please check your connection.")
    process.exit(1)
  }

  const pool = getPool()

  try {
    // Create migrations table first
    const migrationTableQuery = migrations.find((m) => m.name === "010_create_migrations_table")
    await pool.execute(migrationTableQuery.up)

    // Get executed migrations
    const [executedMigrations] = await pool.execute("SELECT migration_name FROM migrations")
    const executedNames = executedMigrations.map((m) => m.migration_name)

    // Run pending migrations
    for (const migration of migrations) {
      if (!executedNames.includes(migration.name)) {
        console.log(`📝 Running migration: ${migration.name}`)

        try {
          await pool.execute(migration.up)
          await pool.execute("INSERT INTO migrations (migration_name) VALUES (?)", [migration.name])
          console.log(`✅ Migration completed: ${migration.name}`)
        } catch (error) {
          console.error(`❌ Migration failed: ${migration.name}`, error.message)
          throw error
        }
      } else {
        console.log(`⏭️  Skipping already executed migration: ${migration.name}`)
      }
    }

    console.log("🎉 All migrations completed successfully!")
  } catch (error) {
    console.error("❌ Migration failed:", error.message)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

async function rollbackMigration(migrationName) {
  console.log(`🔄 Rolling back migration: ${migrationName}`)

  // Load environment variables
  require("dotenv").config()

  const pool = getPool()

  try {
    const migration = migrations.find((m) => m.name === migrationName)
    if (!migration) {
      throw new Error(`Migration not found: ${migrationName}`)
    }

    await pool.execute(migration.down)
    await pool.execute("DELETE FROM migrations WHERE migration_name = ?", [migrationName])

    console.log(`✅ Rollback completed: ${migrationName}`)
  } catch (error) {
    console.error(`❌ Rollback failed: ${migrationName}`, error.message)
    throw error
  } finally {
    await pool.end()
  }
}

// Command line interface
const command = process.argv[2]
const migrationName = process.argv[3]

if (command === "up") {
  runMigrations()
} else if (command === "down" && migrationName) {
  rollbackMigration(migrationName)
} else {
  console.log("Usage:")
  console.log("  node scripts/migrate.js up                    # Run all pending migrations")
  console.log("  node scripts/migrate.js down <migration_name> # Rollback specific migration")
  process.exit(1)
}
