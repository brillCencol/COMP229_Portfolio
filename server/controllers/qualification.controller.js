import Qualification from '../models/qualification.model.js'
import errorHandler from '../helpers/dbErrorHandler.js'
import extend from 'lodash/extend.js'

const create = async (req, res) => {
  try {
    const qualification = new Qualification(req.body)
    await qualification.save()
    res.status(201).json({ message: 'Qualification added successfully!' })
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const list = async (req, res) => {
  try {
    const qualifications = await Qualification.find()
    res.json(qualifications)
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const qualificationByID = async (req, res, next, id) => {
  try {
    const qualification = await Qualification.findById(id)
    if (!qualification) {
      return res.status(400).json({ error: 'Qualification not found' })
    }
    req.qualification = qualification
    next()
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve qualification' })
  }
}

const read = (req, res) => res.json(req.qualification)

const update = async (req, res) => {
  try {
    let qualification = req.qualification
    qualification = extend(qualification, req.body)
    await qualification.save()
    res.json(qualification)
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const remove = async (req, res) => {
  try {
    const deleted = await req.qualification.deleteOne()
    res.json(deleted)
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const removeAll = async (req, res) => {
  try {
    const result = await Qualification.deleteMany()
    res.json({ deletedCount: result.deletedCount })
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, list, read, update, remove, removeAll, qualificationByID }
