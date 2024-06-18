const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Setor = sequelize.define('Setor', {

    setor_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome_setor: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'setor',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "setor_ID" },
        ]
      },
    ]
  });

module.exports = Setor;
