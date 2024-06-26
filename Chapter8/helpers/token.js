const jwt = require("jsonwebtoken");

const creatToken = (payload) => {
  return jwt.sign(payload, "ini merupakan privatekey riyan", { expiresIn: "1h" });
};

const decodeToken = (token) => {
  return jwt.verify(token, "ini merupakan privatekey riyan");
};

// const cretaTokenRefresh = (payload) => {
//     return jwt.sign(payload,'ini merupakan privatekey riyan refresh', {expiresIn: '3h'});
// }

// const decodeTokenRefresh = (token) => {
//     return jwt.decode(token,'ini merupakan privatekey riyan refresh');
// }

module.exports = {
  creatToken,
  decodeToken, //cretaTokenRefresh, decodeTokenRefresh
};
