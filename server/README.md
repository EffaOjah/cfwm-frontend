# CFWM Backend Server

## Overview
Independent Express.js backend server with MySQL database using MVC architecture. This server manages church events, testimonies, store products, sermons, church locations, and forms.

## Project Structure
```
server/
├── config/
│   └── database.js       # MySQL connection pool
├── controllers/          # Business logic (Event, Testimony, Product, Sermon, Location, Form)
├── models/              # Database models (Event, Testimony, Product, Sermon, District, Branch, FirstTimer, PrayerRequest)
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
| `subtitle` | VARCHAR(255) | Event theme/tagline |
| `category` | VARCHAR(100) | Service, Program, Outreach, etc. |
| `description` | TEXT | Detailed description |
| `highlights` | TEXT | Bullet points of event focus |
| `event_date` | DATE | Date of the event |
| `event_time` | TIME | Start time |
| `location` | VARCHAR(255) | Venue name |
| `organizer` | VARCHAR(255) | e.g., Rev. Dr. Nick Ezeh |
| `image_url` | VARCHAR(255) | Poster/Banner URL |
| `status` | ENUM | 'draft' or 'published' |
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

### 3. Products Table (`products`)
Stores store products (books, audiobooks, etc.).
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | VARCHAR(36) | Primary Key (UUID) |
| `title` | VARCHAR(255) | Product title |
| `author` | VARCHAR(255) | Author/Speaker name |
| `description` | TEXT | Product description |
| `price` | DECIMAL(10,2)| Selling price |
| `category` | ENUM | 'book', 'audiobook', 'other' |
| `image_url` | VARCHAR(255) | Cover image URL |
| `file_url` | VARCHAR(255) | Digital download URL |
| `stock_quantity` | INT | Physical stock count |
| `is_digital` | BOOLEAN | If digital product |
| `rating` | DECIMAL(3,2)| User rating (default 5.0) |

### 4. Sermons Table (`sermons`)
Stores video and audio sermons.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | VARCHAR(36) | Primary Key (UUID) |
| `title` | VARCHAR(255) | Sermon title |
| `speaker` | VARCHAR(255) | Speaker's name |
| `series` | VARCHAR(255) | Series name |
| `description` | TEXT | Detailed notes |
| `sermon_date` | DATE | Date preached |
| `duration` | VARCHAR(20) | Length (e.g., 45:30) |
| `type` | ENUM | 'video' or 'audio' |
| `video_url` | VARCHAR(255) | Link to video |
| `audio_url` | VARCHAR(255) | Link to audio |
| `thumbnail_url` | VARCHAR(255) | Preview image |

### 5. Districts Table (`districts`)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | VARCHAR(36) | Primary Key (UUID) |
| `name` | VARCHAR(255) | District name (Unique) |
| `head_pastor` | VARCHAR(255) | Name of District Pastor |

### 6. Branches Table (`branches`)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | VARCHAR(36) | Primary Key (UUID) |
| `district_id` | VARCHAR(36) | FK to `districts.id` |
| `name` | VARCHAR(255) | Branch name (Unique) |
| `address` | TEXT | Physical address |
| `map_url` | TEXT | Google Maps directions/embed link |
| `pastor` | VARCHAR(255) | Resident pastor |

| `phone` | VARCHAR(50) | Contact number |
| `image_url` | VARCHAR(255) | Branch photo URL |
| `is_headquarters` | BOOLEAN | Flag for Headquarters entry |

### 7. First Timers Table (`first_timers`)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | VARCHAR(36) | Primary Key (UUID) |
| `full_name` | VARCHAR(255) | Full name |
| `phone` | VARCHAR(50) | Phone number |
| `email` | VARCHAR(255) | Email address |
| `address` | TEXT | Physical address |
| `how_heard` | VARCHAR(255) | Source of referral |
| `wants_visit` | BOOLEAN | Follow-up visit preference |

### 8. Prayer Requests Table (`prayer_requests`)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | VARCHAR(36) | Primary Key (UUID) |
| `name` | VARCHAR(255) | Name of requester |
| `phone` | VARCHAR(50) | Contact number |
| `request_details` | TEXT | Detailed prayer points |
| `is_confidential` | BOOLEAN | Confidentiality flag |

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

### Products
- `GET /api/products` - Get all products (Supports `?category=book` filter)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Sermons
- `GET /api/sermons` - Get all sermons (Supports `?type=video` filter)
- `GET /api/sermons/:id` - Get single sermon
- `POST /api/sermons` - Create sermon
- `PUT /api/sermons/:id` - Update sermon
- `DELETE /api/sermons/:id` - Delete sermon

### Locations (Locate Us)
- `GET /api/locations/headquarters` - Fetch headquarters details
- `GET /api/locations/districts` - Fetch all districts with their nested branches
- `POST /api/locations/districts` - Create district
- `POST /api/locations/branches` - Create branch (Associate with district using `district_id`)
- `PUT /api/locations/branches/:id` - Update branch
- `DELETE /api/locations/branches/:id` - Delete branch

### Forms
- `POST /api/forms/first-timer` - Submit First Timer details
- `POST /api/forms/prayer-request` - Submit Prayer Request
- `GET /api/forms/first-timers` (Admin) - Fetch all First Timer submissions
- `GET /api/forms/prayer-requests` (Admin) - Fetch all Prayer Request submissions

### Health & Utils
- `GET /api/health` - Check server/database connection
- `GET /` - API version info

## Technologies
- **Express.js** & **Node.js**
- **MySQL2** (with Connection Pooling)
- **UUID** (for scalable identifiers)
- **Dotenv** & **CORS**
- **Nodemon** (Dev-mode)
