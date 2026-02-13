# CFWM Backend Server

## Overview
Independent Express.js backend server with MySQL database using MVC architecture.

## Project Structure
```
server/
├── config/
│   └── database.cjs      # MySQL connection pool
├── controllers/          # Business logic
├── models/              # Database models/queries
├── routes/              # API endpoints
├── node_modules/        # Server dependencies (separate from frontend)
├── package.json         # Server dependencies and scripts
├── .env                 # Environment variables (not in git)
├── .env.example         # Environment template
├── .gitignore          # Git ignore rules
├── README.md           # This file
└── index.cjs           # Main server entry point
```

## Independent Server

The server is now a **separate entity** with its own:
- `package.json` - Independent dependencies
- `node_modules/` - Isolated from frontend dependencies
- Scripts - Run independently or from root

## Getting Started

### Prerequisites
- Node.js (v14+)
- MySQL Server

### Installation

**From server directory:**
```bash
cd server
npm install
```

**From root directory:**
```bash
npm run server
```

### Running the Server

**From server directory:**
```bash
cd server
npm run dev          # Development (auto-reload)
npm start            # Production
```

**From root directory:**
```bash
npm run server       # Development
npm run server:prod  # Production
```

Server runs on `http://localhost:3000`

## MySQL Database

### Connection Pool
The server uses `mysql2/promise` with connection pooling for better performance.

### Example Query Usage
```javascript
const { pool } = require('../config/database.cjs');

// In your controller
const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.json({ data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
```

## API Endpoints

### Health Check
- `GET /api/health` - Server status

## Technologies
- **Express.js** - Web framework
- **MySQL2** - MySQL client with promises
- **CORS** - Cross-origin support
- **Body-parser** - Request parsing
- **Dotenv** - Environment variables
- **Nodemon** - Auto-reload in development
