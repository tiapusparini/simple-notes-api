const db = require("../models");
const Pengguna = db.pengguna;

const config = require("../config/auth.config");
const sendResponse = require("../helpers/response");
// const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//REGISTRASI
exports.register = async (req, res) => {
    const usernameExist = await Pengguna.findOne({
        where: {
            username: req.body.username,
        },
    });

    if (usernameExist !== null)
        return res.status(400).json(sendResponse(400, "Registrasi gagal!", "Username sudah ada", null));
    
    // Create a pengguna
    const pengguna = {
        nama: req.body.nama,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)
    };
    // Save User to Database
    Pengguna.create(pengguna)
        .then(data => {
            res.status(200).json(sendResponse(200, "Registrasi berhasil!", null, data));
        })
        .catch(err => {
            res.status(400).json(sendResponse(400, "Registrasi gagal!", "Error", null));
        });
};

//LOGIN
exports.login = async (req, res) => {
    //Get data if username exist
    const pengguna = await Pengguna.findOne({
        where: {
            username: req.body.username
        }
    });

    //If username exist
    if (pengguna ===  null)
        return res.status(404).json(sendResponse(404, "Pengguna tidak ditemukan", "Pengguna tidak ada", null));
    

    //Check Password
    var passwordIsValid = bcrypt.compareSync(req.body.password, pengguna.password);
    if (!passwordIsValid) 
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Username or Password!"
        });
     
    const data = {
        id: pengguna.id,
        name: pengguna.nama,
        username: pengguna.username,
    };

    var token = jwt.sign(data, config.secret, {
        expiresIn: 86400 // 24 hours
    });

    const sendData = {
        id: pengguna.id,
        name: pengguna.nama,
        token: token,
    };
    res.json(sendResponse(200, "Login success", null, sendData));

};