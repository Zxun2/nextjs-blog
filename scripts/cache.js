const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

function postData() {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontMatter } = matter(markdownWithMeta);

    return {
      slug,
      frontMatter,
    };
  });

  return `export const posts = ${JSON.stringify(posts)}`;
}

try {
  // Find directory
  fs.readdirSync("cache");
} catch (error) {
  // Create directory
  fs.mkdirSync("cache");
}

// Write to directory and cache posts
fs.writeFile("cache/data.js", postData(), function (err) {
  if (err) return console.log(err);
  console.log("Posts Cached...");
});
