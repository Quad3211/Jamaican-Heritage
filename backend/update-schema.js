const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "../database/schema.sql");
let schemaContent = fs.readFileSync(schemaPath, "utf8");

const replacements = [
  [
    "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600",
    "/assets/images/products/coffee.png",
  ],
  [
    "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600",
    "/assets/images/products/jerk_seasoning.png",
  ],
  [
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
    "/assets/images/products/rum_cake.png",
  ],
  [
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600",
    "/assets/images/products/straw_bag.png",
  ],
  [
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
    "/assets/images/products/phrase_book.png",
  ],
  [
    "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600",
    "/assets/images/products/drum.png",
  ],
  [
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600",
    "/assets/images/products/spice_kit.png",
  ],
  [
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600",
    "/assets/images/products/necklace.png",
  ],
  [
    "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600",
    "/assets/images/products/sorrel_tea.png",
  ],
  [
    "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600",
    "/assets/images/products/woodcraft_box.png",
  ],
];

for (const [oldUrl, newUrl] of replacements) {
  schemaContent = schemaContent.replace(oldUrl, newUrl);
}

fs.writeFileSync(schemaPath, schemaContent, "utf8");
console.log("schema.sql updated successfully.");
