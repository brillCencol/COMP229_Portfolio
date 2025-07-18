import Contact from '../models/contact.model.js';

const create = async (req, res) => {
  console.log("📥 Received data:", req.body);

  try {
    const contact = new Contact(req.body);
    await contact.save();
    console.log("✅ Saved successfully!");
    res.status(201).json({ message: 'Message submitted successfully!' });
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(400).json({ error: err.message });
  }
};


export default { create };
