const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ocorrencia = sequelize.define('Ocorrencia', {
    Ocorrencia_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true
    },
    assunto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    envolvidos: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Ocorrencia;