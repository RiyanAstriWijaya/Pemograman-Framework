const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, 'hjhgjjhjgjghgjghgfjghgj', {expiresIn: '1h'});
}
const decodeToken = (token) => {
    return jwt.verify(token, 'hjhgjjhjgjghgjghgfjghgj');
}

module.exports = {
    generateToken, decodeToken
}