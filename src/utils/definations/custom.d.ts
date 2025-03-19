import { UserDB } from '../../models/users/interface'

declare global {
  namespace Express {
    export interface Request {
      user: UserDB
    }
  }
}
