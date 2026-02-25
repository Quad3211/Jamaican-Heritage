const express = require("express");
const { body } = require("express-validator");

const pool = require("../config/db");
const { verifyToken } = require("../middleware/auth");
const { handleValidationErrors } = require("../middleware/validate");

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// ──────────────────────────────────────────────
//  POST /api/orders  — create a new order
// ──────────────────────────────────────────────
router.post(
  "/",
  [
    body("items")
      .isArray({ min: 1 })
      .withMessage("Items must be a non-empty array."),
    body("items.*.product_id")
      .isInt({ min: 1 })
      .withMessage("Each item must have a valid product_id."),
    body("items.*.quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1."),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { items } = req.body;
    const userId = req.user.id;
    const conn = await pool.getConnection();

    try {
      await conn.beginTransaction();

      // Fetch product prices from DB (don't trust client prices)
      const productIds = items.map((i) => i.product_id);
      const [products] = await conn.query(
        `SELECT id, price FROM products WHERE id IN (${productIds.map(() => "?").join(",")})`,
        productIds,
      );

      if (products.length !== productIds.length) {
        await conn.rollback();
        return res
          .status(400)
          .json({ message: "One or more products were not found." });
      }

      const priceMap = {};
      products.forEach((p) => {
        priceMap[p.id] = parseFloat(p.price);
      });

      const total = items.reduce((sum, item) => {
        return sum + (priceMap[item.product_id] || 0) * item.quantity;
      }, 0);

      // Create order
      const [orderResult] = await conn.query(
        "INSERT INTO orders (user_id, total_price) VALUES (?, ?)",
        [userId, total.toFixed(2)],
      );
      const orderId = orderResult.insertId;

      // Insert order items
      const itemRows = items.map((item) => [
        orderId,
        item.product_id,
        item.quantity,
        priceMap[item.product_id],
      ]);
      await conn.query(
        "INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES ?",
        [itemRows],
      );

      await conn.commit();
      return res.status(201).json({
        message: "Order placed successfully.",
        orderId,
        total: total.toFixed(2),
      });
    } catch (err) {
      await conn.rollback();
      console.error("[POST /orders]", err);
      return res
        .status(500)
        .json({ message: "Server error. Your order was not placed." });
    } finally {
      conn.release();
    }
  },
);

// ──────────────────────────────────────────────
//  GET /api/orders  — get authenticated user's orders
// ──────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const [orders] = await pool.query(
      `SELECT o.id, o.total_price, o.status, o.created_at,
              JSON_ARRAYAGG(
                JSON_OBJECT(
                  'product_id', oi.product_id,
                  'name',       p.name,
                  'quantity',   oi.quantity,
                  'unit_price', oi.unit_price
                )
              ) AS items
       FROM orders o
       JOIN order_items oi ON oi.order_id = o.id
       JOIN products    p  ON p.id = oi.product_id
       WHERE o.user_id = ?
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [req.user.id],
    );
    return res.json({ orders });
  } catch (err) {
    console.error("[GET /orders]", err);
    return res.status(500).json({ message: "Server error." });
  }
});

// ──────────────────────────────────────────────
//  GET /api/orders/:id  — get a single order
// ──────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid order ID." });

  try {
    const [orders] = await pool.query(
      `SELECT o.id, o.total_price, o.status, o.created_at,
              JSON_ARRAYAGG(
                JSON_OBJECT(
                  'product_id', oi.product_id,
                  'name',       p.name,
                  'image_url',  p.image_url,
                  'quantity',   oi.quantity,
                  'unit_price', oi.unit_price
                )
              ) AS items
       FROM orders o
       JOIN order_items oi ON oi.order_id = o.id
       JOIN products    p  ON p.id = oi.product_id
       WHERE o.id = ? AND o.user_id = ?
       GROUP BY o.id`,
      [id, req.user.id],
    );

    if (orders.length === 0)
      return res.status(404).json({ message: "Order not found." });
    return res.json({ order: orders[0] });
  } catch (err) {
    console.error("[GET /orders/:id]", err);
    return res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
