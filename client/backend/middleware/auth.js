const jwt = require('jsonwebtoken');
const User = require('../models/User');
require("dotenv").config();

const authMiddleware = (roles) => async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, role: { $in: roles } });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).send({ error: 'Token expired' });
    } else {
      res.status(401).send({ error: 'Not authorized to access this resource' });
    }
  }
};

module.exports = authMiddleware;