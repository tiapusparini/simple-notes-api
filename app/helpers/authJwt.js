const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
// const db = require("../models");
// const Pengguna = db.pengguna;

const authJwt = (req, res, next) => {
  let token = req.headers["authorization"];
  let splitToken = token.split("Bearer ")[1];
  // console.log(splitToken);

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(splitToken, config.secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = authJwt;