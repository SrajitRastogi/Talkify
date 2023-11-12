const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

const generateToken = (id) =>{
    return jwt.sign({id},"srajit",{
        expiresIn:"30d",
    });
};

module.exports = generateToken;