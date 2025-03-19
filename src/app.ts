import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'

import userRoutes from './routers/user'
import authRoutes from './routers/auth'

import { errorMiddleware, unhandledRoutes } from './middlewares/error'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

app.get('/api', (req: Request, res: Response): Response => {
  return res.status(200).send({
    status: 'success',
    statusCode: 200,
    message: 'API server is up and running',
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use(unhandledRoutes)
app.use(errorMiddleware)

export default app
