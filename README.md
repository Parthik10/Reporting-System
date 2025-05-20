# Reporting System

A full-stack web application built with React, Node.js, and MongoDB for managing and generating reports with map integration.

## Features

- User authentication and authorization
- Interactive map integration using Mapbox
- Report generation and management
- File upload capabilities
- Responsive Material-UI design
- Real-time data validation
- Secure API endpoints

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- MongoDB
- npm or yarn package manager
- Git

## Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd reportingSystem
```

### 2. Set Up Environment Variables

#### Server (.env)
Create a `.env` file in the server directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

#### Client (.env)
Create a `.env` file in the client directory with:
```env
VITE_API_URL=http://localhost:5000
VITE_MAPBOX_TOKEN=your_mapbox_token
```

### 3. Install Dependencies

#### Server Setup
```bash
cd server
npm install
```

#### Client Setup
```bash
cd client
npm install
```

## Running the Application

### Development Mode

1. Start the server:
```bash
cd server
npm run dev
```

2. In a new terminal, start the client:
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Production Build

1. Build the client:
```bash
cd client
npm run build
```

2. Start the server:
```bash
cd server
npm start
```

## Project Structure

```
reportingSystem/
├── client/                 # Frontend React application
│   ├── src/               # Source files
│   ├── public/            # Static files
│   └── package.json       # Frontend dependencies
│
└── server/                # Backend Node.js application
    ├── controllers/       # Route controllers
    ├── models/           # Database models
    ├── router/           # API routes
    ├── middlewares/      # Custom middlewares
    ├── validators/       # Input validation
    ├── utils/            # Utility functions
    └── package.json      # Backend dependencies
```

## Technologies Used

### Frontend
- React 18
- Material-UI
- Mapbox GL
- React Router
- Axios
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- Zod for validation
- Bcrypt for password hashing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, please open an issue in the repository or contact the development team. 