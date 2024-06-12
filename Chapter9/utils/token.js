const jwt = require("jsonwebtoken");
const generateToken = (user) => {
  return jwt.sign(user, "ahfsgfgtyghuvjsjkjdshfesff", { expiresIn: "1h" });
};

const decodeToken = (user) => {
  console.log(user);
  return jwt.verify(user, "ahfsgfgtyghuvjsjkjdshfesff");
};

module.exports = {
  generateToken,
  decodeToken,
};
