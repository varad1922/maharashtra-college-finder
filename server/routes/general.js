const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const Subscriber = require('../models/Subscriber');

// POST /api/contact
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Note: Here you would ideally send an email via Resend/SendGrid
    // resend.emails.send({ ... });

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/newsletter
router.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.json({ success: true, message: 'Subscribed successfully!' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already subscribed!' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
