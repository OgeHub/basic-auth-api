import { IUserRepository } from '../repositories/users/interface'
import { IAuthService } from '../services/auth/interface'
import { IUserService } from '../services/users/interface'

interface IContainer {
  // Repositories
  userRepository: IUserRepository

  // Services
  userService: IUserService
  authService: IAuthService
}

export default IContainer
