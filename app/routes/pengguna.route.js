module.exports = app => {
    const pengguna = require("../controllers/pengguna.controller.js");
    
    //Verify Token
    const verifyToken = require("../helpers/authJwt");
  
    var router = require("express").Router();
  
    // Create a new Pengguna
    router.post("/", verifyToken, pengguna.create);
  
    // Retrieve all pengguna
    router.get("/", verifyToken, pengguna.findAll);
  
    // Retrieve a single Pengguna with id
    router.get("/:id", verifyToken, pengguna.findByPk);
  
    // Update a Pengguna with id
    router.put("/:id", verifyToken, pengguna.update);
  
    // Delete a Pengguna with id
    router.delete("/:id", verifyToken, pengguna.deleteById);
  
    // Delete all Pengguna
    // router.delete("/", pengguna.deleteAll);
  
    app.use('/api/pengguna', verifyToken, router);
  };