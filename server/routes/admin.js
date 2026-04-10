const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const College = require('../models/College');

// POST /api/admin/seed
// In a real app, this would be protected by an API Key or Admin Middleware
router.post('/seed', async (req, res) => {
  try {
    // We can't easily import the colleges array from seedData.js if it's not exported
    // So for the API, we'll just require the seedData script logic
    // or better, trigger the seed script as a child process (optional)
    
    // For simplicity, we'll just return a message saying to run the npm script
    // or we'll define a simpler seed function here.
    
    res.json({ 
      success: true, 
      message: 'To seed the database, please run "npm run seed" in the server terminal.' 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
