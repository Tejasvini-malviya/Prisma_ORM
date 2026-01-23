import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./Routes/index.js";
import prisma from "./DB/db.config.js";

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(router);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    status: 500,
    message: "Internal server error",
    error: err.message,
  });
});

// Start server after DB connection
async function startServer() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
    
    const server = app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    });
    
    server.on('error', (err) => {
      console.error('Server error:', err);
    });
  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

startServer();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});
