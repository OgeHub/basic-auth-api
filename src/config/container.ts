import { asClass, createContainer } from 'awilix'
import UserRepository from '../repositories/users/user'
import UserService from '../services/users/user'
import AuthService from '../services/auth/auth'

const container = createContainer()

container.register({
  // Repositories
  userRepository: asClass(UserRepository).singleton(),

  // Services
  userService: asClass(UserService).singleton(),
  authService: asClass(AuthService).singleton(),
})

export default container
