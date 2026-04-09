const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const collegeRoutes = require('./routes/colleges');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/colleges', collegeRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Maharashtra College Finder API is running!' });
});

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
