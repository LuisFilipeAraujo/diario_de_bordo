const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Viagem_ocorrencia = sequelize.define('Viagem_ocorrencia', {
    viagem_ocorrencia_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    viagem_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'viagem',
        key: 'viagem_ID'
      }
    },
    ocorrencia_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ocorrencia',
        key: 'ocorrencia_ID'
      }
    }
  }, {
    sequelize,
    tableName: 'viagem_ocorrencia',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "viagem_ocorrencia_ID" },
        ]
      },
      {
        name: "viagem_ocorrencia_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "viagem_ID" },
        ]
      },
      {
        name: "viagem_ocorrencia_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "ocorrencia_ID" },
        ]
      },
    ]
  });

module.exports=Viagem_ocorrencia;