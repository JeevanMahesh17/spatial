const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming you have a database connection setup in db/index.js

// Route to fetch all points from the database
router.get('/all', async (req, res) => {
  try {
    // Query to fetch points from a table named 'points'
    const points = await db.any('SELECT id, name, ST_AsGeoJSON(location) AS location FROM points');

    // Format the points to include parsed GeoJSON location
    const formattedPoints = points.map(point => ({
      id: point.id,
      name: point.name,
      location: JSON.parse(point.location),
    }));

    // Send the formatted points as JSON
    res.json(formattedPoints);
  } catch (err) {
    console.error('Error fetching points from the database:', err);
    res.status(500).json({ error: 'Failed to fetch points data' });
  }
});

module.exports = router;
