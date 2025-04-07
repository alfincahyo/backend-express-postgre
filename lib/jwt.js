const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = process.env;

module.exports = {
  hash: async (text, saltRounds = 10) => {
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hashSync(text, salt);
    return hash;
  },
  compare: async (text, hash) => {
    return new Promise(function (resolve, reject) {
      var result = bcrypt.compareSync(text, hash)
      if (result) resolve(result)
      else reject(result)
    })
  },
  sign: async (payload) => {
    const expiresIn = process.env.TOKEN_ACCESS_LIFETIME || 60 * 10;
    return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn });
  },
  reset: async (payload) => {
    const expiresIn = "1h";
    return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn });
  },
  verify: async (token) => {
    return jwt.verify(token, JWT_SECRET);
  },
  decode: async (token) => {
    return jwt.decode(token);
  },
  resetPassword: async (payload) => {
    const expiresIn = "1h";
    return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn });
  }
}
