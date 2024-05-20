const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ocorrencia = sequelize.define('Ocorrencia', {
    ocorrencia_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    assunto: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    envolvidos: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ocorrencia',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ocorrencia_ID" },
        ]
      },
    ]
  });
module.exports = Ocorrencia;
