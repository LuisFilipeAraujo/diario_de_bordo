const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  usuario_ID: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  tipo_Usuario: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  setor_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'setor',
      key: 'setor_ID'
    }
  },
  login: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING(60),
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "usuario_ID" },
      ]
    },
    {
      name: "fk_usuario_setor",
      using: "BTREE",
      fields: [
        { name: "setor_ID" },
      ]
    },
  ]
});

module.exports = Usuario;
