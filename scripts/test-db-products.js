const db = require("../lib/database")

async function main() {
  console.log("Attempting to fetch products directly from the database...")
  try {
    const products = await db.getProducts()
    console.log("Products fetched:", JSON.stringify(products, null, 2))

    if (products && products.length > 0) {
      console.log(`\nSuccessfully fetched ${products.length} products.`)
      console.log("Sample product:", JSON.stringify(products[0], null, 2))
    } else if (products && products.length === 0) {
      console.log("\nQuery successful, but no products found matching the criteria (e.g., status = 'active').")
    } else {
      console.log("\nFailed to fetch products or an empty/unexpected result was returned.")
    }
  } catch (error) {
    console.error("Error fetching products directly:", error)
  } finally {
    // If your db connection needs to be explicitly closed, add it here.
    // For mysql2/promise pool, it's generally not needed for short scripts
    // as the process will exit. For long-running apps, connections are managed by the pool.
    // Example: if (db.pool) await db.pool.end();
  }
}

main()