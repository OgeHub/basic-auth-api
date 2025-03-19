import { Request, Response, NextFunction } from 'express'

import logger from '../utils/customLogger'
import container from '../config/container'
import { IUserService } from '../services/users/interface'

const userService = container.resolve<IUserService>('userService')

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userService.getUserByID(req.user.id as string)

    return res.status(200).send({
      status: 'success',
      message: 'User details retrieved successfully',
      data: user,
    })
  } catch (error: any) {
    logger.error(`[GetUserController]:${error}`)
    next(error)
  }
}
