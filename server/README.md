# CFWM Backend Server

## Overview
Independent Express.js backend server with MySQL database using MVC architecture. This server manages church events, and testimonies.

## Project Structure
```
server/
├── config/
│   └── database.js       # MySQL connection pool
├── controllers/          # Business logic (Event, Testimony)
├── models/              # Database models (Event, Testimony)
├── routes/              # API endpoints
├── node_modules/        # Server dependencies
├── package.json         # Server dependencies and scripts
├── .env                 # Environment variables (not in git)
├── .env.example         # Environment template
├── .gitignore          # Git ignore rules
├── README.md           # This file
└── index.js            # Main server entry point
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL Server

### Environment Setup
Create a `.env` file in the `server` directory (refer to `.env.example`):
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=cfwm_db
CLIENT_URL=http://localhost:5173
```

### Installation & Run

```bash
cd server
npm install
npm run dev
```

---

## Database Schema

The server uses **UUIDs** (VARCHAR(36)) for all primary identifiers.

### 1. Events Table (`events`)
Stores church events and programs.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | VARCHAR(36) | Primary Key (UUID) |
| `title` | VARCHAR(255) | Event name |
| `description` | TEXT | Detailed description |
| `event_date` | DATE | Date of the event |
| `event_time` | TIME | Start time |
| `location` | VARCHAR(255) | Venue name |
| `image_url` | VARCHAR(255) | Poster/Banner URL |
| `created_at` | TIMESTAMP | Creation time |

### 2. Testimonies Table (`testimonies`)
Stores member testimonies for moderation and display.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | VARCHAR(36) | Primary Key (UUID) |
| `name` | VARCHAR(255) | Name of testifier |
| `content` | TEXT | The testimony story |
| `category` | VARCHAR(100) | Healing, Provision, etc. |
| `status` | ENUM | 'pending' or 'approved' |
| `created_at` | TIMESTAMP | Submission time |

---

## API Documentation

### Events
- `GET /api/events` - Get all events (Sorted by date)
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Testimonies
- `GET /api/testimonies` - Get approved testimonies
- `GET /api/testimonies/all` - Get all testimonies (Admin)
- `POST /api/testimonies` - Submit testimony (Defaults to pending)
- `PUT /api/testimonies/:id` - Approve/Update testimony
- `DELETE /api/testimonies/:id` - Delete testimony

### Health & Utils
- `GET /api/health` - Check server/database connection
- `GET /` - API version info

## Technologies
- **Express.js** & **Node.js**
- **MySQL2** (with Connection Pooling)
- **UUID** (for scalable identifiers)
- **Dotenv** & **CORS**
- **Nodemon** (Dev-mode)
