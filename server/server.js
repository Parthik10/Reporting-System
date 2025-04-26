require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const contactRoute = require('./router/contact-router');
const serviceRoute = require("./router/service-router");
const reportRoute = require("./router/report-router");
const authRoute = require("./router/auth-router");
const emergencyRoute = require("./router/emergencyRoutes"); 
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error.middleware");
const chatbotRoutes = require('./router/chatbotRoutes');

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});


// Handle CORS
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL, // Ensure this is set correctly in your .env file for the production URL (e.g., Vercel)
    "https://clubmanagement1.netlify.app",  // Production URL (Netlify)
    "http://localhost:5173", // Local development
    "http://localhost:4173"  // Vite preview URL, if applicable
  ].filter(Boolean), // Removes undefined values, ensuring only valid origins
  methods: "GET, POST, PUT, DELETE, PATCH",
  credentials: true,  // Allow cookies to be sent with requests
};

// Use CORS with the defined options
app.use(cors(corsOptions));

// Middleware to parse incoming JSON
app.use(express.json());

// Mount Routers
app.use("/api/form", contactRoute);
app.use("/api/reportform", reportRoute);
app.use("/api/data", serviceRoute);
app.use("/api/auth", authRoute);
app.use("/api/emergency", emergencyRoute); 
app.use('/api', chatbotRoutes);

// Serve static files
app.use("/uploads", express.static("uploads"));

// Error middleware (should be after all routes)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
});
