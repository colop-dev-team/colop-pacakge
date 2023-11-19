import * as bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 12)
}

export const comparePassword = async (rawPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(rawPassword, hashedPassword)
}

export const randomPassword = () => {
  return Math.random().toString(36).slice(-8)
}
