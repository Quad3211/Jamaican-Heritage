const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// ──────────────────────────────────────────────
//  GET /api/products
// ──────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const { category, search, limit = 20, offset = 0 } = req.query;
    let sql = "SELECT * FROM products WHERE 1=1";
    const params = [];

    if (category) {
      sql += " AND category = ?";
      params.push(category);
    }

    if (search) {
      sql += " AND (name LIKE ? OR description LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += " ORDER BY id ASC LIMIT ? OFFSET ?";
    params.push(parseInt(limit, 10), parseInt(offset, 10));

    const [rows] = await pool.query(sql, params);

    // Cache static product lists for 1 hour (3600 seconds)
    res.set("Cache-Control", "public, max-age=3600");
    return res.json({ products: rows, count: rows.length });
  } catch (err) {
    console.error("[GET /products]", err);
    return res.status(500).json({ message: "Server error." });
  }
});

// ──────────────────────────────────────────────
//  GET /api/products/categories
// ──────────────────────────────────────────────
router.get("/categories", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT DISTINCT category FROM products WHERE category IS NOT NULL ORDER BY category",
    );
    res.set("Cache-Control", "public, max-age=3600");
    return res.json({ categories: rows.map((r) => r.category) });
  } catch (err) {
    console.error("[GET /products/categories]", err);
    return res.status(500).json({ message: "Server error." });
  }
});

// ──────────────────────────────────────────────
//  GET /api/products/:id
// ──────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id))
    return res.status(400).json({ message: "Invalid product ID." });

  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Product not found." });

    res.set("Cache-Control", "public, max-age=3600");
    return res.json({ product: rows[0] });
  } catch (err) {
    console.error("[GET /products/:id]", err);
    return res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
