# News Portal

A modern, full-stack news portal built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- 📰 Article management with rich text editor
- 🔥 Breaking news, trending, and latest news sections
- 📂 Category-based article organization
- 🔍 Search functionality
- 📱 Responsive design
- 🎨 Modern UI with dark mode support
- 👤 Admin dashboard for content management
- 🎯 Promotional content management
- 🖼️ Image upload support

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Axios
- React Quill (Rich text editor)
- React Icons
- Vite

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- Multer (File uploads)
- bcryptjs

## Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd News
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_SECRET_KEY=your_admin_secret_key
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5001/api
```

## Running the Application

### Development Mode

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:5001`

### Seed Database (Optional)
```bash
cd backend
node seed.js
```

## Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Set environment variables on your hosting platform
2. Deploy the `backend` directory
3. Ensure the `uploads` folder is persistent or use cloud storage (AWS S3, Cloudinary)

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder
3. Set environment variable:
   - `VITE_API_URL`: Your deployed backend URL

### Full-Stack Deployment (Single Server)

The backend can serve the frontend static files in production. See `server.js` for configuration.

## Project Structure

```
News/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
└── README.md
```

## Admin Access

To create an admin user, use the registration endpoint with the `ADMIN_SECRET_KEY`.

## API Endpoints

### Articles
- `GET /api/articles` - Get all articles
- `GET /api/articles/:id` - Get single article
- `GET /api/articles/trending` - Get trending articles
- `GET /api/articles/breaking` - Get breaking news
- `POST /api/articles` - Create article (Auth required)
- `PUT /api/articles/:id` - Update article (Auth required)
- `DELETE /api/articles/:id` - Delete article (Auth required)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Auth required)
- `DELETE /api/categories/:id` - Delete category (Auth required)

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Promotions
- `GET /api/promotions` - Get all promotions
- `POST /api/promotions` - Create promotion (Auth required)
- `PUT /api/promotions/:id` - Update promotion (Auth required)
- `DELETE /api/promotions/:id` - Delete promotion (Auth required)

## License

ISC

## Author

Your Name
