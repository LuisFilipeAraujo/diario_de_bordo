const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Viagem = sequelize.define('Viagem', {
    viagem_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    veiculo_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'veiculo',
        key: 'veiculo_ID'
      }
    },
    usuario_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'usuario_ID'
      }
    },
    itinerario: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    servico: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    dataSaida: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dataChegada: {
      type: DataTypes.DATE,
      allowNull: false
    },
    kmSaida: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    kmChegada: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'viagem',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "viagem_ID" },
        ]
      },
      {
        name: "fk_viagem_usuario",
        using: "BTREE",
        fields: [
          { name: "usuario_ID" },
        ]
      },
      {
        name: "fk_viagem_veiculo",
        using: "BTREE",
        fields: [
          { name: "veiculo_ID" },
        ]
      },
    ]
  });
  
module.exports = Viagem;