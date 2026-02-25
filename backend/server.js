require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const userRoutes = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 3000;

// ──────────────────────────────────────────────
//  Security Headers & Compression
// ──────────────────────────────────────────────
const compression = require("compression");
app.use(helmet());
app.use(compression());

// ──────────────────────────────────────────────
//  CORS
// ──────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:4200")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. Postman) in dev, plus listed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`));
      }
    },
    credentials: true,
  }),
);

// ──────────────────────────────────────────────
//  Rate Limiting
// ──────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many requests from this IP. Please try again later.",
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message:
      "Too many authentication attempts. Please try again in 15 minutes.",
  },
});

app.use(globalLimiter);

// ──────────────────────────────────────────────
//  Body Parser
// ──────────────────────────────────────────────
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: false, limit: "100kb" }));

// ──────────────────────────────────────────────
//  Health Check
// ──────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ──────────────────────────────────────────────
//  Routes
// ──────────────────────────────────────────────
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// ──────────────────────────────────────────────
//  404 Handler
// ──────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// ──────────────────────────────────────────────
//  Global Error Handler
// ──────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("[Unhandled Error]", err);
  res.status(500).json({ message: "An unexpected error occurred." });
});

// ──────────────────────────────────────────────
//  Start Server
// ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Jamaican Heritage API running on http://localhost:${PORT}`);
});

module.exports = app;
