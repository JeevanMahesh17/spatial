const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.get('/api/polygons/all', async (req, res) => {
    try {
        const result = await db.any('SELECT id, name, ST_AsGeoJSON(geometry) AS geometry FROM polygons');
        const formattedPolygons = result.map(polygon => ({
            id: polygon.id,
            name: polygon.name,
            geometry: JSON.parse(polygon.geometry),
        })).filter(p => p !== null); 

        res.json(formattedPolygons);
    } catch (err) {
        console.error('Error fetching polygons from the database:', err);
        res.status(500).json({ error: 'Failed to fetch polygons data' });
    }
});

module.exports = router;
