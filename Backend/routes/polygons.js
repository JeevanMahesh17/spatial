const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming you have a database connection setup in db/index.js

// Route to fetch all polygons from the database
router.get('/all', async (req, res) => {
  try {
    // Query to fetch polygons from a table named 'polygons'
    const polygons = await db.any('SELECT id, name, ST_AsGeoJSON(geometry) AS geometry FROM polygons');

    // Format the polygons to include parsed GeoJSON geometry
    const formattedPolygons = polygons.map(polygon => ({
      id: polygon.id,
      name: polygon.name,
      geometry: JSON.parse(polygon.geometry),
    }));

    // Send the formatted polygons as JSON
    res.json(formattedPolygons);
  } catch (err) {
    console.error('Error fetching polygons from the database:', err);
    res.status(500).json({ error: 'Failed to fetch polygons data' });
  }
});

module.exports = router;
