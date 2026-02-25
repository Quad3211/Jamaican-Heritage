-- ============================================================
--  Jamaican Heritage E-Commerce — MySQL Schema
-- ============================================================

CREATE DATABASE IF NOT EXISTS jamaican_heritage_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE jamaican_heritage_db;

-- ──────────────────────────────────────────────────────────
--  USERS
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            INT           NOT NULL AUTO_INCREMENT,
  name          VARCHAR(100)  NOT NULL,
  email         VARCHAR(255)  NOT NULL,
  password_hash VARCHAR(255)  NOT NULL,
  created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB;

-- ──────────────────────────────────────────────────────────
--  PRODUCTS
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id          INT             NOT NULL AUTO_INCREMENT,
  name        VARCHAR(150)    NOT NULL,
  price       DECIMAL(10, 2)  NOT NULL,
  description TEXT,
  image_url   VARCHAR(500),
  category    VARCHAR(100),
  stock       INT             NOT NULL DEFAULT 0,
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_products_category (category)
) ENGINE=InnoDB;

-- ──────────────────────────────────────────────────────────
--  ORDERS
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id          INT            NOT NULL AUTO_INCREMENT,
  user_id     INT            NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status      ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled')
              NOT NULL DEFAULT 'pending',
  created_at  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_orders_user_id (user_id),
  CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- ──────────────────────────────────────────────────────────
--  ORDER ITEMS
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id         INT            NOT NULL AUTO_INCREMENT,
  order_id   INT            NOT NULL,
  product_id INT            NOT NULL,
  quantity   INT            NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_order_items_order   (order_id),
  KEY idx_order_items_product (product_id),
  CONSTRAINT fk_oi_order   FOREIGN KEY (order_id)   REFERENCES orders   (id) ON DELETE CASCADE,
  CONSTRAINT fk_oi_product FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ============================================================
--  SEED DATA — 10 sample Jamaican heritage products
-- ============================================================
INSERT INTO products (name, price, description, image_url, category, stock) VALUES
  ('Jamaican Blue Mountain Coffee (250g)',
   18.99,
   'World-renowned coffee grown on the misty slopes of the Blue Mountains. Rich, smooth, and virtually free from bitterness.',
   '/assets/images/products/coffee.png',
   'Food & Drink', 150),

  ('Authentic Jerk Seasoning (300ml)',
   9.49,
   'Traditional Scotch bonnet and allspice jerk marinade. Perfect for chicken, fish, or vegetables.',
   '/assets/images/products/jerk_seasoning.png',
   'Food & Drink', 200),

  ('Jamaican Rum Cake (500g)',
   24.99,
   'A beloved holiday treat soaked in aged Jamaican rum and packed with dried fruits. Rich and indulgent.',
   '/assets/images/products/rum_cake.png',
   'Food & Drink', 80),

  ('Hand-Woven Straw Bag',
   34.99,
   'Handcrafted by Jamaican artisans using locally sourced straw. A functional piece of cultural heritage.',
   '/assets/images/products/straw_bag.png',
   'Crafts & Art', 60),

  ('Jamaican Patwa Phrase Book',
   12.99,
   'Learn the colourful dialect of Jamaica. Includes pronunciation guide, common phrases, and cultural notes.',
   '/assets/images/products/phrase_book.png',
   'Books', 120),

  ('Cedar Reggae Rhythm Drum (Nyahbinghi)',
   89.99,
   'Handmade cedar drum used in traditional Nyahbinghi ceremonies. Deep, resonant sound and beautiful craftsmanship.',
   '/assets/images/products/drum.png',
   'Music & Instruments', 25),

  ('Ackee & Saltfish Spice Kit',
   14.99,
   'Everything you need to make Jamaica's national dish at home. Includes dried ackee, salt cod, and a blend of island spices.',
   '/assets/images/products/spice_kit.png',
   'Food & Drink', 100),

  ('Rastafari Colours Beaded Necklace',
   19.99,
   'Handmade necklace in red, gold, and green — the colours of the Rastafari movement. Sterling silver clasp.',
   '/assets/images/products/necklace.png',
   'Jewellery', 90),

  ('Jamaican Sorrel Tea (100g loose leaf)',
   8.49,
   'Hibiscus-based herbal infusion traditionally enjoyed during Christmas. Refreshing hot or cold.',
   '/assets/images/products/sorrel_tea.png',
   'Food & Drink', 180),

  ('Carved Mahogany Woodcraft Box',
   54.99,
   'Intricate mahogany box hand-carved by Kingston artisans. Features traditional Jamaican motifs. Perfect as a keepsake or gift.',
   '/assets/images/products/woodcraft_box.png',
   'Crafts & Art', 40);

-- ============================================================
--  END OF SCHEMA
-- ============================================================
