module.exports = (sequelize, Sequelize) => {
    const Data = sequelize.define("data_note",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        judul: {
            type: Sequelize.STRING
        },
        isi: {
            type: Sequelize.STRING
        },
        id_pengguna: {
            // allowNull: false,
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false, //set no create column timestamp
        freezeTableName: true //set nama tabel
    });
    return Data;    
};