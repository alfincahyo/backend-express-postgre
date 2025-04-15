const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  hash: async (text, saltRounds = 10) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(text, salt);
    return hash;
  },
  compare: async (text, hash) => {
    try {
      const result = await bcrypt.compare(text, hash);
      if (!result) throw new Error('Password comparison failed');
      return result;
    } catch (error) {
      throw error;
    }
  },
  sign: async (payload) => {
    const expiresIn = process.env.JWT_ACCESS_LIFETIME || 60 * 10;
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn });
  },
  resetPassword: async (payload) => {
    const expiresIn = "1h";
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn });
  },
  verify: async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
  },
  decode: async (token) => {
    return jwt.decode(token);
  }
}
