const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Usuario = sequelize.define('Usuario', {
    usuario_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_Usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    
    },
    setor_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Usuario;