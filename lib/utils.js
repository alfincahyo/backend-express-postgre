const crypto = require('crypto-js');

module.exports = {
    encryptID: (id) => {
      return crypto.AES.encrypt(id, process.env.REQ_API_KEY).toString().replace('/', '*');
    },
    decryptID: (encryptedID) => {
      return crypto.AES.decrypt(encryptedID.toString().replace('*', '/'), process.env.REQ_API_KEY).toString(crypto.enc.Utf8);
    }
  };
  
  
