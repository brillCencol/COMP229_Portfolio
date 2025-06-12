import Qualification from '../models/qualification.model.js'

const create = async (req, res) => {
  console.log("📥 Received qualification data:", req.body)

  try {
    const qualification = new Qualification(req.body)
    await qualification.save()
    console.log("✅ Qualification saved successfully!")
    res.status(201).json({ message: 'Qualification submitted successfully!' })
  } catch (err) {
    console.error("❌ Error saving qualification:", err.message)
    res.status(400).json({ error: err.message })
  }
}

const list = async (req, res) => {
  try {
    const qualifications = await Qualification.find()
    res.json(qualifications)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const qualificationByID = async (req, res, next, id) => {
  try {
    const qualification = await Qualification.findById(id)
    if (!qualification) {
      return res.status(404).json({ error: "Qualification not found" })
    }
    req.qualification = qualification
    next()
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve qualification" })
  }
}

const read = (req, res) => {
  return res.json(req.qualification)
}

const update = async (req, res) => {
  try {
    const qualification = Object.assign(req.qualification, req.body)
    await qualification.save()
    res.json({ message: "Qualification updated", qualification })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const remove = async (req, res) => {
  try {
    const deleted = await req.qualification.deleteOne()
    res.json({ message: "Qualification deleted", deleted })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const removeAll = async (req, res) => {
  try {
    const result = await Qualification.deleteMany({})
    res.json({ message: `${result.deletedCount} qualifications deleted.` })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export default {
  create,
  list,
  qualificationByID,
  read,
  update,
  remove,
  removeAll
}
