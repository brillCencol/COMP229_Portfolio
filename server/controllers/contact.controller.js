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

const list = async (req, res) => {
  try {
    const contacts = await Contact.find()
    res.json(contacts)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const contactByID = async (req, res, next, id) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    req.contact = contact;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve contact" });
  }
};

const read = (req, res) => {
  return res.json(req.contact);
};

const update = async (req, res) => {
  try {
    const contact = Object.assign(req.contact, req.body);
    await contact.save();
    res.json({ message: "Contact updated", contact });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await req.contact.deleteOne();
    res.json({ message: "Contact deleted", deleted });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const removeAll = async (req, res) => {
  try {
    const result = await Contact.deleteMany({});
    res.json({ message: `${result.deletedCount} contacts deleted.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { create, list, contactByID, read, update, remove, removeAll };
