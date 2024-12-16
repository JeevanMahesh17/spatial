// const express = require('express');
// // Updated import
// const pointsRoutes = require('./routes/points'); // Inside src/

// const pool = require('../db'); // Assuming you have a configured PostgreSQL connection in 'db/index.js'

// const router = express.Router();

// // Get all points
// router.get('/points', async (req, res) => {
//   try {
//     const points = await pool.query('SELECT * FROM points');
//     res.json(points.rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Get a specific point
// router.get('/points/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const point = await pool.query('SELECT * FROM points WHERE id = $1', [id]);

//     if (point.rows.length === 0) {
//       return res.status(404).json({ message: 'Point not found' });
//     }

//     res.json(point.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Create a new point
// router.post('/points', async (req, res) => {
//   try {
//     const { name, latitude, longitude } = req.body;
//     const newPoint = await pool.query(
//       'INSERT INTO points (name, latitude, longitude) VALUES ($1, $2, $3) RETURNING *',
//       [name, latitude, longitude]
//     );
//     res.json(newPoint.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Update a point
// router.put('/points/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, latitude, longitude } = req.body;

//     const updatedPoint = await pool.query(
//       'UPDATE points SET name = $1, latitude = $2, longitude = $3 WHERE id = $4 RETURNING *',
//       [name, latitude, longitude, id]
//     );

//     if (updatedPoint.rows.length === 0) {
//       return res.status(404).json({ message: 'Point not found' });
//     }

//     res.json(updatedPoint.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Delete a point
// router.delete('/points/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedPoint = await pool.query('DELETE FROM points WHERE id = $1 RETURNING *', [id]);

//     if (deletedPoint.rows.length === 0) {
//       return res.status(404).json({ message: 'Point not found' });
//     }

//     res.json({ message: 'Point deleted successfully' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;
