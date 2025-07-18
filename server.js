import config from './config/config.js'
import app from './server/express.js'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise

mongoose.connect(config.mongoUri, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB:', config.mongoUri)
}).catch((err) => {
  console.error('❌ Could not connect to MongoDB:', err.message)
})

app.get("/", (req, res) => {
  res.json({ message: "Welcome to User application. WITH MONGOOSE" });
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('🚀 Server started on port %s.', config.port)
})
