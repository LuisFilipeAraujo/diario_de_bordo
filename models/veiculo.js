const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('veiculo', {
    veiculo_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    marca: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    modelo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    placa: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    setor_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'setor',
        key: 'setor_ID'
      }
    }
  }, {
    sequelize,
    tableName: 'veiculo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "veiculo_ID" },
        ]
      },
      {
        name: "fk_veiculo_setor",
        using: "BTREE",
        fields: [
          { name: "setor_ID" },
        ]
      },
    ]
  });
};
