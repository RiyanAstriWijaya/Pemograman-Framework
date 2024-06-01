const jwt = require("jsonwebtoken");

const creatToken = (payload) => {
  return jwt.sign(payload, "ini merupakan privatekey riyan", { expiresIn: "1h" });
};

const decodeToken = (token) => {
  return jwt.verify(token, "ini merupakan privatekey riyan");
};

module.exports = {
  creatToken,
  decodeToken,
};
