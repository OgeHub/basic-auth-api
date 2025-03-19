import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { UserDB } from './interface'
import generateOTP from '../../utils/otp'
import HttpException from '../../utils/http.exception'

const userSchema = new Schema<UserDB>(
  {
    first_name: {
      type: String,
      required: true,
    },

    last_name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    username: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    passwordResetOTP: {
      type: String,
      default: undefined,
    },

    passwordOTPExpires: {
      type: Date,
      default: undefined,
    },
  },
  {
    timestamps: true,
  },
)

userSchema.pre<UserDB>('save', async function (next) {
  if (!this.isModified('password')) return next()

  const hashedPassword = await bcrypt.hash(this.password, 10)
  this.password = hashedPassword

  next()
})

userSchema.methods.isValidPassword = async function (
  password: string,
): Promise<Error | boolean> {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.getPasswordResetOTP = function (): string {
  /**Generate token */
  const resetOTP = generateOTP()

  /**Hash token and save it */
  this.passwordResetOTP = crypto
    .createHash('sha256')
    .update(resetOTP)
    .digest('hex')

  /**Set expiration date for token */
  this.passwordOTPExpires = new Date(Date.now() + 10 * 60 * 1000)

  return resetOTP
}

userSchema.methods.verifyPasswordResetOTP = function (otp: string): void {
  const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex')

  if (this.passwordResetOTP !== hashedOTP) {
    throw new HttpException(404, 'Invalid OTP')
  }

  if (new Date() > this.passwordOTPExpires) {
    throw new HttpException(404, 'OTP has expired')
  }
}

const UserModel = model<UserDB>('User', userSchema)

export default UserModel
