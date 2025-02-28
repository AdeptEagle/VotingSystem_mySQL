import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./src/config/ormconfig";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  const dbStatus = AppDataSource.isInitialized ? "connected" : "disconnected";
  res.status(200).json({ 
    status: "healthy",
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Initialize database and start server
AppDataSource.initialize()
  .then(() => {
    console.log("Database Connected Successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Health check available at http://localhost:${PORT}/health`);
      console.log(`API endpoints available at http://localhost:${PORT}/api/*`);
    });
  })
  .catch((error: Error) => {
    console.error("Failed to start server:", {
      message: error.message,
      stack: error.stack
    });
    process.exit(1);
  });
