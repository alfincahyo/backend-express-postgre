const userServices = require('../services/user.services');
const jwt = require('../lib/jwt');
const { httpLogger, formatHTTPLoggerResponse } = require('../lib/logger');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '');
  if (!token) {
    return res.status(403).json({ message: 'Forbidden Access' });
  }
  try {
    jwt.verify(token).then(async (result) => {
      return jwt.decode(token).then(async (result) => {
        const { id, username, email, name } = result;
        res.locals.user = { id, username, email, name };

        const checkUser = await userServices.findById(id);
        const active = checkUser.is_active;

        if (!checkUser) {
          return res.status(401).json({ message: 'Unauthorized, User not found !' });
        }

        if (!active) {
          return res.status(401).json({ message: 'Unauthorized, User is not active !' });
        }


        next();
      }).catch((err) => {
        return res.status(401).json({ message: 'Unauthorized', error: err });
      });
    }).catch((err) => {
      httpLogger.error('Error login', formatHTTPLoggerResponse(req, res, err));
      return res.status(401).json({ message: 'Unauthorized', error: err });
    });
  } catch (error) {
    httpLogger.error('Error login', formatHTTPLoggerResponse(req, res, error));
    return res.status(401).json({ message: 'Unauthorized', error: error });
  }
};

module.exports = authMiddleware;
