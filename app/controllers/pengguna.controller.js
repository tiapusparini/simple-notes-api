const db = require("../models");
const Pengguna = db.pengguna;
const Op = db.Sequelize.Op;

//CREATE, READ, UPDATE, DELETE
// Create and Save a new Pengguna
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a pengguna
    const pengguna = {
        id: req.body.id,
        nama: req.body.nama,
        username: req.body.username,
        password: req.body.password
    };

    // Save pengguna in the database
    Pengguna.create(pengguna)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(400).send({
                message:
                err.message || "Some error occurred while creating the Pengguna."
            });
        });  
};

// Retrieve all Pengguna from the database.
exports.findAll = (req, res) => {
    // const pengguna = {
    //     id: req.body.id,
    //     nama: req.body.nama,
    //     username: req.body.username,
    //     password: req.body.password
    // };
    // var condition = pengguna ? { pengguna: { [Op.iLike]: `%${pengguna}%` } } : null;

    Pengguna.findAll() //{ where: condition }
      .then(data => {
      res.send(data);
      })
      .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occurred while retrieving pengguna."
      });
    });
};

// Find a single Pengguna with an id
exports.findByPk = (req, res) => {
    const id = req.params.id;

    Pengguna.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
};

// Update a Pengguna by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

    Pengguna.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Pengguna was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Pengguna with id=${id}. Maybe Pengguna was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Pengguna with id=" + id
        });
      });
};

// Delete a Pengguna with the specified id in the request
exports.deleteById = (req, res) => {
  const id = req.params.id;
  
    Pengguna.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Pengguna was deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot deleted Pengguna with id=${id}. Maybe Pengguna was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleted Pengguna with id=" + id
        });
      });
};

// Delete all Pengguna from the database.
// exports.deleteAll = (req, res) => {
//     Pengguna.destroy({
//         where: {},
//         truncate: false
//     })
//         .then(nums => {
//           res.send({ message: `${nums} Pengguna were deleted successfully!` });
//         })
//         .catch(err => {
//           res.status(500).send({
//             message:
//               err.message || "Some error occurred while removing all Pengguna."
//           });
//         });
// };