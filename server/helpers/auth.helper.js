import jwt from 'jsonwebtoken'
import { expressjwt as expressJwt } from 'express-jwt'
import config from '../../config/config.js'

export const requireSignin = expressJwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
  userProperty: 'auth'
})

export const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if (!authorized) {
    return res.status(403).json({ error: "User is not authorized" })
  }
  next()
}
