import { FilterQuery } from 'mongoose'
import { User } from '../../models/users/interface'
import { IUserService } from './interface'
import { IUserRepository } from '../../repositories/users/interface'
import IContainer from '../../config/interface'
import logger from '../../utils/customLogger'
import HttpException from '../../utils/http.exception'

class UserService implements IUserService {
  private userRepository: IUserRepository

  constructor(params: IContainer) {
    this.userRepository = params.userRepository
  }

  async createUser(payload: User) {
    const user = await this.userRepository.createUser(payload)

    logger.info(
      `[CreateUserService]: User with ID ${user.id} created successfully`,
    )
    return user
  }

  async getUser(filter: FilterQuery<User>) {
    const user = await this.userRepository.getUser(filter)

    if (!user) throw new HttpException(404, 'User not found')

    logger.info(`[GetUserService]: User with ID ${user.id} found successfully`)
    return user
  }

  async getUserByID(id: string) {
    const user = await this.userRepository.getUserByID(id)

    if (!user) throw new HttpException(404, 'User not found')

    logger.info(
      `[GetUserByIDService]: User with ID ${user.id} found successfully`,
    )
    return user
  }

  async getUsers(filter: FilterQuery<User>) {
    const users = await this.userRepository.getUsers(filter)

    if (users.length === 0) throw new HttpException(404, 'No user found')

    logger.info(`[GetUsersService]: ${users.length} user(s) found successfully`)
    return users
  }

  async updateUserByID(id: string, update: FilterQuery<User>) {
    await this.getUserByID(id)

    const updatedUser = await this.userRepository.updateUserByID(id, update)

    logger.info(
      `[UpdateUserByIDService]: ${updatedUser?.id} user updated successfully`,
    )
    return updatedUser
  }

  async updateUser(filter: FilterQuery<User>, update: FilterQuery<User>) {
    await this.getUser(filter)

    const updatedUser = await this.userRepository.updateUser(filter, update)

    logger.info(
      `[UpdateUserService]: ${updatedUser?.id} user updated successfully`,
    )
    return updatedUser
  }

  async deleteUser(id: string) {
    await this.getUserByID(id)

    const deletedUser = await this.userRepository.deleteUser(id)

    logger.info(
      `[DeleteUserService]: ${deletedUser?.id} user deleted successfully`,
    )
    return deletedUser ? true : false
  }
}

export default UserService
