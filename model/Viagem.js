const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Viagem = sequelize.define('Viagem', {
    Viagem_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true
    },
    Veiculo_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true
    },
    Usuario_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true
    },

    itinerario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    servico: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    dataChegada: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dataSaida: {
        type: DataTypes.DATE,
        allowNull: false
    },
    KmChegada: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    KmSaida: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = Viagem;