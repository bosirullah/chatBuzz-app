const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // we are sending the token inside the headers of the request.
    // the token will be bearer token.
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // we are going to decode the toke i.e Bearer sdlkjfdfkjld
            token = req.headers.authorization.split(" ")[1];

            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // we are going to find the user in the database and return without the password.
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = { protect };
