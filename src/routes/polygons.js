// const express = require("express");
// const db = require("../db");
// const router = express.Router();

// // Example route
// router.get("/", async (req, res) => {
//   try {
//     const polygons = await db.any("SELECT id, name, ST_AsText(geom) AS geom FROM polygons");
//     res.json(polygons);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch polygons" });
//   }
// });

// module.exports = router;
