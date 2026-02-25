const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function replaceInFile(filePath, searchRegex, replacement) {
  const content = fs.readFileSync(filePath, "utf8");
  const updatedContent = content.replace(searchRegex, replacement);
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, "utf8");
    console.log(`Updated references in ${filePath}`);
  }
}

// 1. Process all .scss files
walkDir("./src", (filePath) => {
  if (filePath.endsWith(".scss")) {
    const cssPath = filePath.replace(/\.scss$/, ".css");
    console.log(`Compiling ${filePath} to ${cssPath}`);

    // Compile using sass
    execSync(`npx sass "${filePath}" "${cssPath}"`);

    // Delete original .scss and map
    fs.unlinkSync(filePath);
    if (fs.existsSync(cssPath + ".map")) {
      fs.unlinkSync(cssPath + ".map");
    }
  }
});

// 2. Update .ts files
walkDir("./src", (filePath) => {
  if (filePath.endsWith(".ts")) {
    replaceInFile(filePath, /\.component\.scss/g, ".component.css");
  }
});

// 3. Update angular.json
const ngJsonPath = "./angular.json";
if (fs.existsSync(ngJsonPath)) {
  replaceInFile(ngJsonPath, /"style": "scss"/g, '"style": "css"');
  replaceInFile(
    ngJsonPath,
    /"inlineStyleLanguage": "scss"/g,
    '"inlineStyleLanguage": "css"',
  );
  replaceInFile(ngJsonPath, /"src\/styles\.scss"/g, '"src/styles.css"');
}

console.log("Successfully completed SCSS to CSS conversion.");
