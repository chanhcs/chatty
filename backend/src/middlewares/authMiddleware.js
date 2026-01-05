import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Missing access token' })
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY
    )

    const user = await User.findById(decoded.userId).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(403).json({
      message: 'Access token has expired or is invalid'
    })
  }
}
