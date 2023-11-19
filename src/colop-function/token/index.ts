import * as jwt from 'jsonwebtoken'

export const generateToken = (userId: string, secret: string) => {
  const date = new Date()
  const exp = date.setDate(date.getDate() + 7)
  const contentJwt = {
    userId,
    iat: Math.floor(Date.now() / 1000),
    exp: exp / 1000,
  }

  return jwt.sign(contentJwt, secret, {
    algorithm: 'HS512',
  })
}

export const validateToken = (token: string, secret: string) => {
  return jwt.verify(token, secret, {
    algorithms: ['HS512'],
  })
}

export const decodeToken = (token: string) => {
  return jwt.decode(token) as { userId: string }
}
