import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/modules/users/users.route'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Applications routes
app.use('/api/v1/users/', router)

// for  testing
app.get('/', async (req: Request, res: Response) => {
  res.send(`Cooking successfully 🍗`)
})

export default app
