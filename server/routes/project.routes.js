import express from 'express'
import projectCtrl from '../controllers/project.controller.js'

const router = express.Router()   // ✅ define router BEFORE use

// No `/api` here — it's already prefixed in express.js
router.route('/projects')
  .post(projectCtrl.create)
  .get(projectCtrl.list)
  .delete(projectCtrl.removeAll)

router.param('projectId', projectCtrl.projectByID)

router.route('/projects/:projectId')
  .get(projectCtrl.read)
  .put(projectCtrl.update)
  .delete(projectCtrl.remove)

export default router
