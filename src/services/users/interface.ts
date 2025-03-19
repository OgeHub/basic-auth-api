import { FilterQuery } from 'mongoose'
import { User, UserDB } from '../../models/users/interface'

export interface IUserService {
  createUser(payload: User): Promise<UserDB>
  getUser(filter: FilterQuery<User>): Promise<UserDB | null>
  getUserByID(id: string): Promise<UserDB | null>
  getUsers(filter: FilterQuery<User>): Promise<UserDB[] | []>
  updateUserByID(id: string, update: FilterQuery<User>): Promise<UserDB | null>
  updateUser(
    filter: FilterQuery<User>,
    update: FilterQuery<User>,
  ): Promise<UserDB | null>
  deleteUser(id: string): Promise<boolean>
}
