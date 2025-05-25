import { executeQuery, findOne, findMany, insertRecord, updateRecord } from "./db-config"

class MySQLDatabase {
  // Products CRUD
  async getProducts(filters = {}) {
    let query = 'SELECT * FROM products WHERE status = "active"'
    const params = []

    if (filters.category) {
      query += " AND category = ?"
      params.push(filters.category)
    }

    query += " ORDER BY created_at DESC"

    const result = await findMany(query, params)
    return result.success ? result.data : []
  }

  async getProduct(id) {
    const result = await findOne('SELECT * FROM products WHERE id = ? AND status = "active"', [id])
    return result.success ? result.data : null
  }

  async addProduct(product) {
    const result = await insertRecord("products", product)
    if (result.success) {
      return await this.getProduct(result.data.insertId)
    }
    return null
  }

  async updateProduct(id, updates) {
    const result = await updateRecord("products", updates, "id = ?", [id])
    if (result.success) {
      return await this.getProduct(id)
    }
    return null
  }

  async deleteProduct(id) {
    const result = await updateRecord("products", { status: "inactive" }, "id = ?", [id])
    return result.success
  }

  // Gallery CRUD
  async getGallery(filters = {}) {
    let query = 'SELECT * FROM gallery WHERE status = "active"'
    const params = []

    if (filters.category) {
      query += " AND category = ?"
      params.push(filters.category)
    }

    query += " ORDER BY sort_order ASC, created_at DESC"

    const result = await findMany(query, params)
    return result.success ? result.data : []
  }

  async addGalleryImage(image) {
    const result = await insertRecord("gallery", image)
    if (result.success) {
      const newImage = await findOne("SELECT * FROM gallery WHERE id = ?", [result.data.insertId])
      return newImage.success ? newImage.data : null
    }
    return null
  }

  async deleteGalleryImage(id) {
    const result = await updateRecord("gallery", { status: "inactive" }, "id = ?", [id])
    return result.success
  }

  // Contacts
  async addContact(contact) {
    const result = await insertRecord("contacts", contact)
    if (result.success) {
      const newContact = await findOne("SELECT * FROM contacts WHERE id = ?", [result.data.insertId])
      return newContact.success ? newContact.data : null
    }
    return null
  }

  async getContacts(filters = {}) {
    let query = "SELECT * FROM contacts"
    const params = []

    if (filters.status) {
      query += " WHERE status = ?"
      params.push(filters.status)
    }

    query += " ORDER BY created_at DESC"

    const result = await findMany(query, params)
    return result.success ? result.data : []
  }

  async updateContactStatus(id, status) {
    const result = await updateRecord("contacts", { status }, "id = ?", [id])
    if (result.success) {
      const contact = await findOne("SELECT * FROM contacts WHERE id = ?", [id])
      return contact.success ? contact.data : null
    }
    return null
  }

  // Settings
  async getSettings() {
    const result = await findMany("SELECT setting_key, setting_value, setting_type FROM settings")
    if (result.success) {
      const settings = {}
      result.data.forEach((setting) => {
        let value = setting.setting_value

        // Convert based on type
        switch (setting.setting_type) {
          case "number":
            value = Number(value)
            break
          case "boolean":
            value = value === "true"
            break
          case "json":
            try {
              value = JSON.parse(value)
            } catch (e) {
              value = setting.setting_value
            }
            break
        }

        settings[setting.setting_key] = value
      })
      return settings
    }
    return {}
  }

  async updateSettings(updates) {
    try {
      for (const [key, value] of Object.entries(updates)) {
        const stringValue = typeof value === "object" ? JSON.stringify(value) : String(value)

        const [existing] = await executeQuery("SELECT id FROM settings WHERE setting_key = ?", [key])

        if (existing.success && existing.data.length > 0) {
          await updateRecord("settings", { setting_value: stringValue }, "setting_key = ?", [key])
        } else {
          await insertRecord("settings", {
            setting_key: key,
            setting_value: stringValue,
            setting_type: typeof value === "object" ? "json" : typeof value,
          })
        }
      }
      return await this.getSettings()
    } catch (error) {
      console.error("Error updating settings:", error)
      return null
    }
  }

  // Users
  async getUser(username) {
    const result = await findOne("SELECT * FROM users WHERE username = ?", [username])
    return result.success ? result.data : null
  }

  async getUserByEmail(email) {
    const result = await findOne("SELECT * FROM users WHERE email = ?", [email])
    return result.success ? result.data : null
  }

  // Analytics
  async addAnalyticsEvent(event) {
    const result = await insertRecord("analytics", {
      event_type: event.type,
      event_data: JSON.stringify(event.data || {}),
      ip_address: event.ip_address,
      user_agent: event.user_agent,
      page_url: event.page_url,
      referrer: event.referrer,
      session_id: event.session_id,
    })
    return result.success
  }

  async getAnalytics() {
    try {
      // Get total visits
      const visitsResult = await findOne('SELECT COUNT(*) as total FROM analytics WHERE event_type = "page_visit"')
      const totalVisits = visitsResult.success ? visitsResult.data.total : 0

      // Get total contacts
      const contactsResult = await findOne("SELECT COUNT(*) as total FROM contacts")
      const totalContacts = contactsResult.success ? contactsResult.data.total : 0

      // Get total products
      const productsResult = await findOne('SELECT COUNT(*) as total FROM products WHERE status = "active"')
      const totalProducts = productsResult.success ? productsResult.data.total : 0

      // Get total gallery images
      const galleryResult = await findOne('SELECT COUNT(*) as total FROM gallery WHERE status = "active"')
      const totalGalleryImages = galleryResult.success ? galleryResult.data.total : 0

      // Get monthly visits
      const monthlyResult = await findMany(`
        SELECT 
          DATE_FORMAT(created_at, '%Y-%m') as month,
          COUNT(*) as visits
        FROM analytics 
        WHERE event_type = "page_visit" 
          AND created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
        GROUP BY DATE_FORMAT(created_at, '%Y-%m')
        ORDER BY month
      `)

      const monthlyVisits = {}
      if (monthlyResult.success) {
        monthlyResult.data.forEach((row) => {
          monthlyVisits[row.month] = row.visits
        })
      }

      return {
        totalVisits,
        totalContacts,
        totalProducts,
        totalGalleryImages,
        monthlyVisits,
      }
    } catch (error) {
      console.error("Error getting analytics:", error)
      return {
        totalVisits: 0,
        totalContacts: 0,
        totalProducts: 0,
        totalGalleryImages: 0,
        monthlyVisits: {},
      }
    }
  }

  async incrementVisits(sessionData = {}) {
    // Ensure all fields have at least null values instead of undefined
    const sanitizedData = {
      type: "page_visit",
      data: sessionData,
      ip_address: sessionData.ip_address || null,
      user_agent: sessionData.user_agent || null,
      page_url: sessionData.page_url || null,
      referrer: sessionData.referrer || null,
      session_id: sessionData.session_id || null
    }
    return await this.addAnalyticsEvent(sanitizedData)
  }
}

// Singleton instance
const db = new MySQLDatabase()
export default db
