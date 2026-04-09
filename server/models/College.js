const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: { type: String },
  city: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String },
  affiliation: { type: String },
  website: { type: String },
  type: { type: String, enum: ['Government', 'Private', 'Autonomous', 'Deemed'], default: 'Private' },
  streams: [{ type: String }],
  exams: [{ type: String }],
  cutoffs: {
    jee: { type: Number, default: null },
    cet: { type: Number, default: null },
    neet: { type: Number, default: null },
    hsc: { type: Number, default: null },
  },
  fees: {
    engineering: { type: Number, default: null },
    medical: { type: Number, default: null },
    pharmacy: { type: Number, default: null },
    science: { type: Number, default: null },
    commerce: { type: Number, default: null },
    arts: { type: Number, default: null },
    management: { type: Number, default: null },
  },
  ranking: { type: Number, default: 999 },
  rating: { type: Number, default: 3.5 },
  established: { type: Number },
  totalSeats: { type: Number },
  description: { type: String },
  lat: { type: Number },
  lng: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('College', collegeSchema);
