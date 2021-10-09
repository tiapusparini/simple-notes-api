module.exports = (sequelize, Sequelize) => {
    const Pengguna = sequelize.define("pengguna", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nama: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
    },
    {
        timestamps: false, //set no create column timestamp
        freezeTableName: true //set nama tabel
    });
    return Pengguna;    
};