import { Document } from 'mongoose'

export interface User {
  password: string
  first_name: string
  last_name: string
  username: string
  email: string
}

export interface loginProps {
  email: string
  password: string
}

export interface UserDB extends Document {
  first_name: string
  last_name: string
  username: string
  email: string
  id?: string
  password: string
  passwordResetOTP: string
  passwordOTPExpires: Date

  isValidPassword(password: string): Promise<Error | Boolean>
  getPasswordResetOTP(): string
  verifyPasswordResetOTP(otp: string): void
}
