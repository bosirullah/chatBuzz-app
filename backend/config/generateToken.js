const jwt = require("jsonwebtoken");

// JWT signs a new token with the particular new id and takes extra two parameters which are a JWT secret key and the third parameter is expiration time
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = generateToken;
