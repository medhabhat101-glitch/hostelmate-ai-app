const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Allow the server to read JSON data
app.use(express.json());

// Serve your existing HTML, CSS, and JavaScript files
app.use(express.static(__dirname));

// Test whether the backend is running
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "HostelMate AI backend is running!"
  });
});

// Open the main webpage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log("HostelMate AI running at http://localhost:3000");
});