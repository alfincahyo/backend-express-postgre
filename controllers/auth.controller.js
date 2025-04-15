const { httpLogger, formatHTTPLoggerResponse } = require('../lib/logger');
const jwt = require('../lib/jwt');
const userServices = require('../services/user.services');

const login = async (req, res) => {

  try {
    const { username, password } = req.body;
    const userData = await userServices.findByUsernameOrEmail(username);

    jwt
      .compare(password, userData.password)
      .then(async (result) => {
        const token = await jwt.sign({
          id: userData.id,
          username: userData.username,
          email: userData.email,
          name: userData.name,
        });

        const response = {
          success: true,
          message: "Login successful",
          data: {
            token: token,
            user: userData
          }
        }

        httpLogger.info('Success login', formatHTTPLoggerResponse(req, res, response));

        return res.status(200).json(response);
      }).catch((err) => {
        throw {
          success: false,
          code: 400,
          message: "Password is incorrect",
          error: err,
        }
      });

  } catch (error) {
    httpLogger.error('Error login', formatHTTPLoggerResponse(req, res, error));
    res.status(error.code).json({ success: false, message: "Error login", Error: error });
  }
}

module.exports = {
  login
};

