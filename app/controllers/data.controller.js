const db = require("../models");
const Data = db.data;
const Pengguna = db.pengguna;
const Op = db.Sequelize.Op;

//CREATE, READ, UPDATE, DELETE
// Create and Save a new Data
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.judul) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const data = {
        id: req.body.id,
        judul: req.body.judul,
        isi: req.body.isi,
        kodeWarna: req.body.kodeWarna,
        id_pengguna: req.body.id_pengguna,
    };

    // Save pengguna in the database
    await Data.create(data)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Tutorial."
            });
        });  
};

// Retrieve all Data from the database.
exports.findAll = async (req, res) => {
  await Data.findAll({
    include: [{model: Pengguna, attributes: ["id", "nama", "username"]}],
    order: [
      ['updatedAt', 'DESC'],
    ],
    }) //{ where: condition }
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

// Find a single Data with an id
exports.findByPk = async (req, res) => {
    const id = req.params.id;

    await Data.findByPk(id, {include: [{model: Pengguna, attributes: ["id", "nama", "username"]}]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
};

// Find a Data with an id_pengguna
exports.findByIdPengguna = async (req, res) => {
  const id_pengguna = req.params.id_pengguna;
  
  await Data.findAll({
    where: {id_pengguna}, 
    include: [{model: Pengguna, attributes: ["id", "nama", "username"]}],
    order: [
      ['updatedAt', 'DESC'],
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id_pengguna=" + id
      });
    });
};

// Update a Data by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;

    await Data.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Data was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Data with id=${id}. Maybe Data was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Data with id=" + id
        });
      });
};

// Delete a Data with the specified id in the request
exports.deleteById = async (req, res) => {
    const id = req.params.id;

    await Data.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Data was deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot deleted Data with id=${id}. Maybe Data was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleted Data with id=" + id
        });
      });
};

// Delete all Data from the database.
// exports.deleteAll = (req, res) => {
//     Data.destroy({
//         where: {},
//         truncate: false
//     })
//         .then(nums => {
//           res.send({ message: `${nums} Data were deleted successfully!` });
//         })
//         .catch(err => {
//           res.status(500).send({
//             message:
//               err.message || "Some error occurred while removing all Data."
//           });
//         });
// };