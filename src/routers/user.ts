import express, { Router } from 'express'
import { getProfile } from '../controllers/user.controller'
import { authenticated } from '../middlewares/auth'

const router: Router = express.Router()

router.use(authenticated)

router.get('/profile', getProfile)

export default router
