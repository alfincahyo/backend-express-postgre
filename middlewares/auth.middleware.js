const userServices = require('../services/user.services');
const jwt = require('../lib/jwt');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    jwt.verify(token).then((result) => {
      return jwt.decode(token).then((result) => {
        const { id, username, email, name, active } = result;
        res.locals.user = { id, username, email, name, active };

        const checkUser = userServices.findById(id);

        if (!checkUser) {
          return res.status(401).json({ message: 'User not found !' });
        }

        if (!active) {
          return res.status(401).json({ message: 'User is not active !' });
        }


        next();
      }).catch((err) => {
        return res.status(401).json({ message: 'Unauthorized', error: err });
      });
    }).catch((err) => {
      return res.status(401).json({ message: 'Unauthorized', error: err });
    });
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', error: error });
  }
};

module.exports = authMiddleware;
