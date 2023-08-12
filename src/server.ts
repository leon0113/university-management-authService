import mongoose from 'mongoose'
import app from './app'
// import port from './confiq/index';
import confiq from './confiq/index'
import { logger, errorLogger } from './shared/logger'

async function boostrap() {
  try {
    await mongoose.connect(confiq.database_url as string)
    logger.info(`✌ MongoDB connection established successfully.`)

    app.listen(confiq.port, () => {
      logger.info(`Application listening on port ${confiq.port}`)
    })
  } catch (err) {
    errorLogger.error('Failed to connect database!', err)
  }
}

boostrap()
