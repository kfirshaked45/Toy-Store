const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

function encrypt(str) {
  const encryptedStr = cryptr.encrypt(str);
  return encryptedStr;
}

function decrypt(value) {
  const str = cryptr.decrypt(value);
  return str;
}

module.exports = {
  encrypt,
  decrypt,
};
