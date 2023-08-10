import mongoose from 'mongoose'
import app from './app'
// import port from './confiq/index';
import confiq from './confiq/index'

async function boostrap() {
  try {
    await mongoose.connect(confiq.database_url as string)
    console.log(`✌ MongoDB connection established successfully.`)

    app.listen(confiq.port, () => {
      console.log(`Application listening on port ${confiq.port}`)
    })
  } catch (err) {
    console.log('Failed to connect database!', err)
  }
}

boostrap()
