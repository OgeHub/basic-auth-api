import { z } from 'zod'
import { User } from '../models/users/interface'

// Validates register user data
export const validateRegisterUserData = (data: User) => {
  const schema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'Password must contain at least one special character',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/^[^\s]*$/, { message: 'Password must not contain spaces' }),
  })

  return schema.parse(data)
}

export const validateLoginData = (data: User) => {
  const schema = z.object({
    password: z.string(),
    email: z.string().email(),
  })

  return schema.parse(data)
}
