const pool = require("./config/db");

async function updateImages() {
  const images = {
    1: "/assets/images/products/coffee.png",
    2: "/assets/images/products/jerk_seasoning.png",
    3: "/assets/images/products/rum_cake.png",
    4: "/assets/images/products/straw_bag.png",
    5: "/assets/images/products/phrase_book.png",
    6: "/assets/images/products/drum.png",
    7: "/assets/images/products/spice_kit.png",
    8: "/assets/images/products/necklace.png",
    9: "/assets/images/products/sorrel_tea.png",
    10: "/assets/images/products/woodcraft_box.png",
  };

  try {
    for (const [id, url] of Object.entries(images)) {
      await pool.query("UPDATE products SET image_url = ? WHERE id = ?", [
        url,
        id,
      ]);
      console.log(`Updated product ${id} with image ${url}`);
    }
    console.log("Successfully updated all product images in the database.");
  } catch (err) {
    console.error("Error updating images:", err);
  } finally {
    process.exit(0);
  }
}

updateImages();
