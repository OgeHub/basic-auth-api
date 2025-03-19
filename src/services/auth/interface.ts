import { loginProps, User } from '../../models/users/interface'

export interface IAuthService {
  register(payload: User): Promise<string>
  login(payLoad: loginProps): Promise<string | undefined>
}
