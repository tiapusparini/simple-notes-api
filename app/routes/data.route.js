module.exports = app => {
    const data = require("../controllers/data.controller.js");
    const verifyToken = require("../helpers/authJwt");
  
    var router = require("express").Router();
  
    // Create a new data
    router.post("/", data.create);
  
    // Retrieve all data
    router.get("/", data.findAll);
  
    // Retrieve a single data with id
    router.get("/:id", data.findByPk);
  
    //Retrieve a data with id_pengguna 
    router.get("/id_pengguna/:id_pengguna", data.findByIdPengguna);
  
    // Update a data with id
    router.put("/:id", data.update);
  
    // Delete a data with id
    router.delete("/:id", data.deleteById);
  
    // Delete a all data
    // router.delete("/", data.deleteAll);
  
    app.use('/data', router);
  };