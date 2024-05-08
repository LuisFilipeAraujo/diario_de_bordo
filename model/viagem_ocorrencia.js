const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Viagem_ocorrencia = sequelize.define('Viagem_ocorrencia', {
    viagem_ocorrencia_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true
    },
    viagem_ID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ocorrencia_ID: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Viagem_ocorrencia;