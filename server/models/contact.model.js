import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  firstname: {
        type: String,
        trim: true,
        required: 'First Name is required'
    },
  lastname: { type: String, required: true, trim: true },
  email: {
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
  phone: { type: String },
  message: { type: String, required: true },
  created: { type: Date, default: Date.now }
});

export default mongoose.model('Contact', ContactSchema);
