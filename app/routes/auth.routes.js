module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
  
    var router = require("express").Router();
  
    // Create a new account
    router.post("/register", auth.register);
  
    // Login
    router.post("/login", auth.login);
  
    app.use('/api/auth', router);
  };