import UserModel from '../../models/users/user'
import { User } from '../../models/users/interface'
import { IUserRepository } from './interface'
import { FilterQuery } from 'mongoose'

class UserRepository implements IUserRepository {
  async createUser(payload: User) {
    return await UserModel.create(payload)
  }

  async getUser(filter: FilterQuery<User>) {
    return await UserModel.findOne(filter).select('-__v')
  }

  async getUserByID(id: string) {
    return await UserModel.findById(id).select('-__v -password')
  }

  async getUsers(filter: FilterQuery<User>) {
    return await UserModel.find(filter).select('-__v').sort('-createdAt')
  }

  async updateUserByID(id: string, update: FilterQuery<User>) {
    return await UserModel.findByIdAndUpdate(id, update, { new: true }).select(
      '-__v',
    )
  }

  async updateUser(filter: FilterQuery<User>, update: FilterQuery<User>) {
    return await UserModel.findOneAndUpdate(filter, update, {
      new: true,
    }).select('-__v')
  }

  async deleteUser(id: string) {
    return await UserModel.findByIdAndDelete(id)
  }
}

export default UserRepository
