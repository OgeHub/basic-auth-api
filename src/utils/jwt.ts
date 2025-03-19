import jwt, { SignOptions } from 'jsonwebtoken'
import { Schema } from 'mongoose'

import { UserDB } from '../models/users/interface'

export interface Token extends Object {
  id: Schema.Types.ObjectId
  expiresIn: number
}
const JWT_EXPIRE_AT = process.env.JWT_EXPIRE_AT
const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret

if (!JWT_EXPIRE_AT) throw new Error('JWT_EXPIRE_AT not defined')
if (!JWT_SECRET) throw new Error('JWT_SECRET not defined')

export const createToken = (user: UserDB): string => {
  const payload = { id: user._id }
  const options: SignOptions = {
    expiresIn: Number(JWT_EXPIRE_AT),
  }

  return jwt.sign(payload, JWT_SECRET, options)
}

export const verifyToken = async (
  token: string,
): Promise<jwt.VerifyErrors | Token> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, payLoad) => {
      if (err) reject(err)

      resolve(payLoad as Token)
    })
  })
}
