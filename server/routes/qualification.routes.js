import express from 'express'
import qualificationCtrl from '../controllers/qualification.controller.js'

const router = express.Router()

router.route('/qualifications')
  .get(qualificationCtrl.list)
  .post(qualificationCtrl.create)
  .delete(qualificationCtrl.removeAll)

router.route('/qualifications/:qualificationId')
  .get(qualificationCtrl.read)
  .put(qualificationCtrl.update)
  .delete(qualificationCtrl.remove)

router.param('qualificationId', qualificationCtrl.qualificationByID)

export default router
