const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");

const pool = require("../config/db");
const { handleValidationErrors } = require("../middleware/validate");

const router = express.Router();
const SALT_ROUNDS = 12;

// ──────────────────────────────────────────────
//  POST /api/auth/register
// ──────────────────────────────────────────────
router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required.")
      .isLength({ max: 100 }),
    body("email")
      .trim()
      .isEmail()
      .withMessage("A valid email is required.")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters.")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter.")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number."),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { name, email, password } = req.body;

    try {
      // Check for existing user
      const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [
        email,
      ]);
      if (rows.length > 0) {
        return res
          .status(409)
          .json({ message: "An account with that email already exists." });
      }

      // Hash password
      const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

      // Insert user
      const [result] = await pool.query(
        "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
        [name, email, password_hash],
      );

      // Issue JWT
      const token = jwt.sign(
        { id: result.insertId, name, email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
      );

      return res.status(201).json({
        message: "Account created successfully.",
        token,
        user: { id: result.insertId, name, email },
      });
    } catch (err) {
      console.error("[register]", err);
      return res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }
  },
);

// ──────────────────────────────────────────────
//  POST /api/auth/login
// ──────────────────────────────────────────────
router.post(
  "/login",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("A valid email is required.")
      .normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const [rows] = await pool.query(
        "SELECT id, name, email, password_hash FROM users WHERE email = ?",
        [email],
      );

      if (rows.length === 0) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      const user = rows[0];
      const match = await bcrypt.compare(password, user.password_hash);

      if (!match) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
      );

      return res.json({
        message: "Login successful.",
        token,
        user: { id: user.id, name: user.name, email: user.email },
      });
    } catch (err) {
      console.error("[login]", err);
      return res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }
  },
);

module.exports = router;
