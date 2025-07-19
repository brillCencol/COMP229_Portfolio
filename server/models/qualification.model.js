import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    trim: true,
    required: 'School name is required'
  },
  location: {
    type: String,
    trim: true
  },
  degree: {
    type: String,
    trim: true,
    required: 'Degree is required'
  },
  fieldOfStudy: {
    type: String,
    trim: true
  },
  gradMonth: {
    type: String,
    required: 'Graduation month is required'
  },
  gradYear: {
    type: String,
    required: 'Graduation year is required'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Education', EducationSchema);
