import jwt from 'jsonwebtoken'

export const createToken = async (secret, user) => await jwt.sign(user, secret, {expiresIn: `90d`})
