const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Setor = sequelize.define('Setor', {
    Setor_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true
    },
    nome_setor: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Setor;