const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081" //backend
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Simple App." });
});

require("./app/routes/pengguna.route.js")(app);
require("./app/routes/data.route.js")(app);
require('./app/routes/auth.routes.js')(app);

// set port, listen for requests (frontend)
const PORT = process.env.PORT || 8080; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// For production, just insert these rows manually 
// and use sync() without parameters to avoid dropping data
// db.sequelize.sync();