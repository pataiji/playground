const path = require("path");

module.exports = [
  {
    mode: "development",
    entry: "./src/app.js",
    output: {
      filename: "bundle.js",
      path: path.join(__dirname, "public/js")
    }
  },
  {
    mode: "development",
    entry: "./src/app_client.js",
    output: {
      filename: "bundle_client.js",
      path: path.join(__dirname, "public/js")
    }
  }
];
