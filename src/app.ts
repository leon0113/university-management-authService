import express, { Application } from 'express'
import cors from 'cors'
import router from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Applications routes
app.use('/api/v1/users/', router)

// global error handler
app.use(globalErrorHandler)

export default app
