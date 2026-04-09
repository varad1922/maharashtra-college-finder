const express = require('express');
const router = express.Router();
const College = require('../models/College');

// GET all colleges with optional filters
router.get('/', async (req, res) => {
  try {
    const { city, stream, exam } = req.query;
    let filter = {};
    if (city) filter.city = { $regex: city, $options: 'i' };
    if (stream) filter.streams = stream;
    if (exam) filter.exams = exam;
    const colleges = await College.find(filter).sort({ ranking: 1 });
    res.json({ success: true, count: colleges.length, data: colleges });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET all distinct cities
router.get('/cities', async (req, res) => {
  try {
    const cities = await College.distinct('city');
    res.json({ success: true, data: cities.sort() });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST suggest colleges based on marks
router.post('/suggest', async (req, res) => {
  try {
    const { examType, score, city } = req.body;
    if (!examType || score === undefined) {
      return res.status(400).json({ success: false, message: 'examType and score are required' });
    }

    let filter = {};
    let scorePath = '';
    switch (examType) {
      case 'JEE':  filter.exams = 'JEE';  scorePath = 'jee';  break;
      case 'CET':  filter.exams = 'CET';  scorePath = 'cet';  break;
      case 'NEET': filter.exams = 'NEET'; scorePath = 'neet'; break;
      case 'HSC':  filter.exams = 'HSC';  scorePath = 'hsc';  break;
      default: return res.status(400).json({ success: false, message: 'Invalid examType' });
    }

    if (city && city !== 'all') filter.city = { $regex: city, $options: 'i' };

    const colleges = await College.find(filter);

    const results = colleges.map((college) => {
      const cutoff = college.cutoffs[scorePath];
      if (cutoff === null || cutoff === undefined) return null;
      const diff = score - cutoff;
      let chance, chanceLevel;
      if (diff >= 10)       { chance = 'Excellent'; chanceLevel = 4; }
      else if (diff >= 0)   { chance = 'Good';      chanceLevel = 3; }
      else if (diff >= -15) { chance = 'Try Your Luck'; chanceLevel = 2; }
      else                  { chance = 'Difficult'; chanceLevel = 1; }

      let relevantFees = null;
      if (examType === 'JEE' || examType === 'CET') relevantFees = college.fees.engineering;
      if (examType === 'NEET') relevantFees = college.fees.medical || college.fees.pharmacy;
      if (examType === 'HSC')  relevantFees = college.fees.science || college.fees.commerce || college.fees.arts;

      let suggestedStreams = [];
      if (examType === 'JEE' || examType === 'CET') suggestedStreams = college.streams.filter(s => ['Engineering','Pharmacy'].includes(s));
      if (examType === 'NEET') suggestedStreams = college.streams.filter(s => ['Medical','Pharmacy'].includes(s));
      if (examType === 'HSC')  suggestedStreams = college.streams.filter(s => ['Science','Commerce','Arts','Law','Management'].includes(s));

      return { ...college.toObject(), chance, chanceLevel, relevantFees, suggestedStreams, cutoffScore: cutoff, scoreDiff: diff };
    })
    .filter(Boolean)
    .sort((a, b) => b.chanceLevel !== a.chanceLevel ? b.chanceLevel - a.chanceLevel : b.scoreDiff - a.scoreDiff);

    let streamSuggestions = [];
    if (examType === 'JEE' || examType === 'CET') {
      streamSuggestions = [
        { stream: 'Computer Science Engineering', icon: '💻', reason: 'Highest demand, excellent placements in top MNCs' },
        { stream: 'Mechanical Engineering', icon: '⚙️', reason: 'Core engineering with versatile career options' },
        { stream: 'Electronics & Telecommunication', icon: '📡', reason: 'Booming tech and telecom sector in Maharashtra' },
        { stream: 'Civil Engineering', icon: '🏗️', reason: 'Massive infrastructure growth across Maharashtra' },
        { stream: 'Information Technology', icon: '🖥️', reason: 'Software industry powerhouse in Pune & Mumbai' },
      ];
    } else if (examType === 'NEET') {
      streamSuggestions = [
        { stream: 'MBBS', icon: '🩺', reason: 'Most prestigious medical degree with highest demand' },
        { stream: 'BDS (Dental Surgery)', icon: '🦷', reason: 'Shorter duration with great independent practice scope' },
        { stream: 'BAMS (Ayurveda)', icon: '🌿', reason: 'Growing demand for holistic & alternative medicine' },
        { stream: 'B.Pharm', icon: '💊', reason: 'Pharmaceutical industry is booming in Pune & Mumbai' },
        { stream: 'B.Sc Nursing', icon: '👩‍⚕️', reason: 'High demand both in India and abroad' },
      ];
    } else {
      streamSuggestions = [
        { stream: 'B.Sc Computer Science', icon: '💻', reason: 'Gateway to thriving IT industry in Maharashtra' },
        { stream: 'B.Com', icon: '📊', reason: 'Foundation for finance, banking & CA careers' },
        { stream: 'BBA (Business Admin)', icon: '🏢', reason: 'Management foundation for corporate careers' },
        { stream: 'B.A. Psychology', icon: '🧠', reason: 'Rapidly growing mental health sector' },
        { stream: 'BCA (Computer Apps)', icon: '🖥️', reason: 'Direct entry into software development' },
      ];
    }

    res.json({ success: true, count: results.length, data: results, streamSuggestions, examType, score });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single college by id
router.get('/:id', async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ success: false, message: 'College not found' });
    res.json({ success: true, data: college });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
