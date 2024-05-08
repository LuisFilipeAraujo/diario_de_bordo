const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ocorrencia', {
    ocorrencia_ID: {
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
};
