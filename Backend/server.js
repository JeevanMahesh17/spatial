const express = require("express");
const cors = require("cors");
const path = require("path");
const pointsRoutes = require("./routes/points");
const polygonsRoutes = require("./routes/polygons");


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// API Routes

app.use("/routes/points", pointsRoutes);
app.use("/api/polygons", polygonsRoutes);

// Serve React frontend
app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
