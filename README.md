# Primadona & Co - Company Profile with CMS

A complete Next.js application with MySQL database for CV. Primadona & Co charcoal producer and exporter.

## Features

- **Frontend**: Company profile website with responsive design
- **Backend**: Complete CMS with MySQL database
- **Authentication**: Secure admin login system
- **Product Management**: CRUD operations for products
- **Gallery Management**: Image gallery with categories
- **Contact Management**: Contact form with admin dashboard
- **Analytics**: Basic website analytics and statistics
- **Settings**: Configurable company information

## Database Setup

### Prerequisites

- Node.js 18+ installed
- MySQL server running on 145.79.12.106:3306
- Database access credentials

### Environment Setup

1. Copy the environment file:
\`\`\`bash
cp .env.example .env.local
\`\`\`

2. Update the environment variables:
\`\`\`env
DB_HOST=145.79.12.106
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=primadona_db
\`\`\`

### Database Migration and Seeding

1. **Install dependencies:**
\`\`\`bash
npm install
\`\`\`

2. **Run migrations to create tables:**
\`\`\`bash
npm run migrate
\`\`\`

3. **Seed the database with sample data:**
\`\`\`bash
npm run seed
\`\`\`

4. **Or do both in one command:**
\`\`\`bash
npm run db:setup
\`\`\`

### Available Database Commands

\`\`\`bash
# Run all pending migrations
npm run migrate

# Rollback a specific migration
npm run migrate:down migration_name

# Seed database with sample data
npm run seed

# Clear all data from database
npm run seed:clear

# Clear and reseed database
npm run seed:fresh

# Setup database (migrate + seed)
npm run db:setup
\`\`\`

## Development

\`\`\`bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
\`\`\`

## Database Schema

### Tables Created:

1. **users** - Admin users and authentication
2. **products** - Product catalog with categories and pricing
3. **gallery** - Image gallery with categories and sorting
4. **contacts** - Contact form submissions
5. **settings** - Configurable application settings
6. **analytics** - Website analytics and tracking
7. **orders** - Customer orders (future feature)
8. **order_items** - Order line items (future feature)
9. **sessions** - User session management
10. **migrations** - Migration tracking

## Admin Access

- **URL**: `/admin/login`
- **Username**: `admin`
- **Password**: `admin123`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Gallery
- `GET /api/gallery` - Get all gallery images
- `POST /api/gallery` - Add new image
- `DELETE /api/gallery/[id]` - Delete image

### Contacts
- `GET /api/contact` - Get all contacts (admin)
- `POST /api/contact` - Submit contact form

### Settings
- `GET /api/settings` - Get all settings
- `PUT /api/settings` - Update settings

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout

### Analytics
- `GET /api/analytics` - Get analytics data
- `POST /api/analytics` - Track events

## Production Deployment

1. Set up MySQL database on production server
2. Update environment variables for production
3. Run migrations and seeding on production database
4. Deploy to Vercel or your preferred hosting platform

## Security Notes

- Change default admin credentials in production
- Use strong passwords for database and admin accounts
- Enable SSL/TLS for database connections in production
- Set secure environment variables
- Implement rate limiting for API endpoints
- Use HTTPS in production

## Troubleshooting

### Database Connection Issues

1. Verify MySQL server is running
2. Check firewall settings for port 3306
3. Verify database credentials
4. Ensure database exists or create it manually

### Migration Issues

1. Check database permissions
2. Verify table doesn't already exist
3. Check for foreign key constraints
4. Review migration logs for specific errors

### Seeding Issues

1. Ensure migrations have been run first
2. Check for duplicate data constraints
3. Verify required fields are provided
4. Review seed data for format issues
