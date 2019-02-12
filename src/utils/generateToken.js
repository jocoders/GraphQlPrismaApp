import jwt from 'jsonwebtoken'
import getUserId from '../utils/getUserId'

const generateToken = (userId) => {
  return jwt.sign({userId}, 'thisisasecret', { expiresIn: '7 days' })
  
}

export { generateToken as default }
