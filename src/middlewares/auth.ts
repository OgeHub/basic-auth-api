import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import HttpException from '../utils/http.exception'
import { Token, verifyToken } from '../utils/jwt'
import container from '../config/container'
import { IUserService } from '../services/users/interface'
import { UserDB } from '../models/users/interface'

const userService = container.resolve<IUserService>('userService')

export const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return next(new HttpException(401, 'Unauthorized'))
  }

  const accessToken = bearer?.split('Bearer ')[1].trim()

  try {
    const payLoad: Token | jwt.JsonWebTokenError =
      await verifyToken(accessToken)
    if (payLoad instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(401, 'Token expired, login to get access'))
    }

    const user = (await userService.getUserByID(String(payLoad.id))) as UserDB

    req.user = user
    return next()
  } catch (error) {
    return next(new HttpException(401, 'Unauthorized'))
  }
}
