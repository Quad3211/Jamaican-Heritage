const express = require("express");
const { body } = require("express-validator");

const pool = require("../config/db");
const { verifyToken } = require("../middleware/auth");
const { handleValidationErrors } = require("../middleware/validate");

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// ──────────────────────────────────────────────
//  GET /api/users/profile
// ──────────────────────────────────────────────
router.get("/profile", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE id = ?",
      [req.user.id],
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "User not found." });
    return res.json({ user: rows[0] });
  } catch (err) {
    console.error("[GET /users/profile]", err);
    return res.status(500).json({ message: "Server error." });
  }
});

// ──────────────────────────────────────────────
//  PUT /api/users/profile
// ──────────────────────────────────────────────
router.put(
  "/profile",
  [
    body("name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Name cannot be blank.")
      .isLength({ max: 100 }),
    body("email")
      .optional()
      .trim()
      .isEmail()
      .withMessage("A valid email is required.")
      .normalizeEmail(),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { name, email } = req.body;

    if (!name && !email) {
      return res
        .status(400)
        .json({ message: "Provide at least one field to update." });
    }

    try {
      // Check email uniqueness if changing
      if (email) {
        const [existing] = await pool.query(
          "SELECT id FROM users WHERE email = ? AND id != ?",
          [email, req.user.id],
        );
        if (existing.length > 0) {
          return res
            .status(409)
            .json({ message: "That email is already in use." });
        }
      }

      const updates = [];
      const params = [];

      if (name) {
        updates.push("name = ?");
        params.push(name);
      }
      if (email) {
        updates.push("email = ?");
        params.push(email);
      }

      params.push(req.user.id);
      await pool.query(
        `UPDATE users SET ${updates.join(", ")} WHERE id = ?`,
        params,
      );

      const [rows] = await pool.query(
        "SELECT id, name, email, created_at FROM users WHERE id = ?",
        [req.user.id],
      );

      return res.json({ message: "Profile updated.", user: rows[0] });
    } catch (err) {
      console.error("[PUT /users/profile]", err);
      return res.status(500).json({ message: "Server error." });
    }
  },
);

module.exports = router;
