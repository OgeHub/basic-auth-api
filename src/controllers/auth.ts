import { NextFunction, Request, Response } from 'express'
import container from '../config/container'
import { IAuthService } from '../services/auth/interface'
import { validateLoginData, validateRegisterUserData } from '../validators/auth'
import logger from '../utils/customLogger'

const authService = container.resolve<IAuthService>('authService')

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    validateRegisterUserData(req.body)

    const access_token = await authService.register(req.body)

    res.status(201).send({
      status: 'success',
      message: 'User registered successfully',
      data: {
        access_token,
      },
    })
  } catch (error: any) {
    logger.error(`[RegisterController]: ${error}`)
    next(error)
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    validateLoginData(req.body)

    const access_token = await authService.login(req.body)

    res.status(200).send({
      status: 'success',
      message: 'User login successful',
      data: {
        access_token,
      },
    })
  } catch (error: any) {
    logger.error(`[LoginController]: ${error}`)
    next(error)
  }
}
