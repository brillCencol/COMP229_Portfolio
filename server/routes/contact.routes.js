import express from 'express';
import contactCtrl from '../controllers/contact.controller.js';
import { requireSignin, hasAuthorization } from '../helpers/auth.helper.js'

const router = express.Router();

router.route('/contacts')
  .post(contactCtrl.create);

export default router;
