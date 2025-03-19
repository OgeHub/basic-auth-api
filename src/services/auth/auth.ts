import IContainer from '../../config/interface'
import { loginProps, User, UserDB } from '../../models/users/interface'
import logger from '../../utils/customLogger'
import { createToken } from '../../utils/jwt'
import { IUserService } from '../users/interface'
import { IAuthService } from './interface'

class AuthService implements IAuthService {
  private userService: IUserService

  constructor(params: IContainer) {
    this.userService = params.userService
  }

  async register(payload: User) {
    const registeredUser = await this.userService.createUser(payload)

    logger.info(
      `[RegisterService]: user with ID ${registeredUser.id} registered successfully`,
    )
    return createToken(registeredUser)
  }

  async login(payLoad: loginProps): Promise<string | undefined> {
    const user = (await this.userService.getUser({
      email: payLoad.email,
    })) as UserDB

    if (await user.isValidPassword(payLoad.password)) {
      return createToken(user)
    }
  }
}

export default AuthService
