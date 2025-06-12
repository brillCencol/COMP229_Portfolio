import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import contactRoutes from './routes/contact.routes.js'
import projectRoutes from './routes/project.routes.js'
import qualificationRoutes from './routes/qualification.routes.js'

const app = express()

// ✅ Middleware
app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ✅ Routes
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', contactRoutes)
app.use('/api', projectRoutes)  
app.use('/api', qualificationRoutes)

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ": " + err.message })
    } else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message })
        console.log(err)
    }
})

export default app
