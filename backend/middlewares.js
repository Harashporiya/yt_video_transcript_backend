import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
//   console.log(authHeader)
  const token = req.headers.authorization
//   console.log(token)

  if (!token) return res.status(401).json({ message: 'Access token is missing' });

   try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
   } catch (error) {
    return res.status(403).json({ message: 'Invalid access token' });
   }
};