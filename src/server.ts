import mongoose from 'mongoose'
import app from './app'
// import port from './confiq/index';
import confiq from './confiq/index'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

// to handle uncaught expection
process.on('uncaughtException', error => {
  errorLogger.error('Uncaught expection is detected....', error)
  process.exit(1)
})

let server: Server

async function boostrap() {
  let server: Server

  try {
    await mongoose.connect(confiq.database_url as string)
    logger.info(`✌ MongoDB connection established successfully.`)

    server = app.listen(confiq.port, () => {
      logger.info(`Application listening on port ${confiq.port}`)
    })
  } catch (err) {
    errorLogger.error('Failed to connect database!:::', err)
  }

  // handle promise rejection
  process.on('unhandledRejection', error => {
    errorLogger.error(
      'Unhandle Rejection is detected, We are closing your server!',
      error,
    )
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

boostrap()

// to terminate server when we send signal
process.on('SIGTERM', () => {
  logger.info('SIGTERM is recieved')
  if (server) {
    server.close()
  }
})
