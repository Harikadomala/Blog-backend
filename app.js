import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import v1Routes from './api/v1/routes.js';
import connectDB from './config/db.js';
import contactRoutes from './api/v1/contact/routes.js';


dotenv.config();
const app = express();

// Middleware
app.use(cors({ 
  origin: ['https://blog-frontend-1lj8.onrender.com/'], 
  credentials: true }));
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/api/v1', v1Routes);

app.use('/api/v1/contact', contactRoutes);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
