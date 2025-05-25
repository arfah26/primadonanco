const mysql = require("mysql2/promise")
require('dotenv').config({ path: '.env.local' })

// Database configuration
// Verify environment variables are loaded
console.log('Database Config:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
})

const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

if (!dbConfig.host || !dbConfig.user || !dbConfig.password || !dbConfig.database) {
  console.error("Missing required database configuration. Please check your environment variables.")
}

// Create connection pool
let pool = null

function getPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig)
  }
  return pool
}

// Test database connection
async function testConnection() {
  try {
    const connection = await getPool().getConnection()
    console.log("✅ Database connected successfully")
    connection.release()
    return true
  } catch (error) {
    console.error("❌ Database connection failed:", error.message)
    return false
  }
}

// Execute query with error handling
async function executeQuery(query, params = []) {
  try {
    const pool = getPool()
    const [results] = await pool.execute(query, params)
    return { success: true, data: results }
  } catch (error) {
    console.error("Database query error:", error)
    return { success: false, error: error.message }
  }
}

// Get single record
async function findOne(query, params = []) {
  const result = await executeQuery(query, params)
  if (!result.success) { // Query execution failed
    return { success: false, error: result.error, data: null }
  }
  if (result.data && result.data.length > 0) { // Query succeeded and found data
    return { success: true, data: result.data[0] }
  }
  // Query succeeded but found no data
  return { success: true, data: null }
}

// Get multiple records
async function findMany(query, params = []) {
  return await executeQuery(query, params)
}

// Insert record
async function insertRecord(table, data) {
  const fields = Object.keys(data).join(", ")
  const placeholders = Object.keys(data)
    .map(() => "?")
    .join(", ")
  const values = Object.values(data)

  const query = `INSERT INTO ${table} (${fields}) VALUES (${placeholders})`
  return await executeQuery(query, values)
}

// Update record
async function updateRecord(table, data, whereClause, whereParams = []) {
  const setClause = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(", ")
  const values = [...Object.values(data), ...whereParams]

  const query = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`
  return await executeQuery(query, values)
}

// Delete record
async function deleteRecord(table, whereClause, whereParams = []) {
  const query = `DELETE FROM ${table} WHERE ${whereClause}`
  return await executeQuery(query, whereParams)
}

module.exports = {
  getPool,
  testConnection,
  executeQuery,
  findOne,
  findMany,
  insertRecord,
  updateRecord,
  deleteRecord,
}
