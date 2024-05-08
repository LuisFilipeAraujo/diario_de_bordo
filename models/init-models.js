var DataTypes = require("sequelize").DataTypes;
var _ocorrencia = require("./ocorrencia");
var _setor = require("./setor");
var _usuarios = require("./usuarios");
var _veiculo = require("./veiculo");
var _viagem = require("./viagem");
var _viagem_ocorrencia = require("./viagem_ocorrencia");

function initModels(sequelize) {
  var ocorrencia = _ocorrencia(sequelize, DataTypes);
  var setor = _setor(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);
  var veiculo = _veiculo(sequelize, DataTypes);
  var viagem = _viagem(sequelize, DataTypes);
  var viagem_ocorrencia = _viagem_ocorrencia(sequelize, DataTypes);

  viagem_ocorrencia.belongsTo(ocorrencia, { as: "ocorrencium", foreignKey: "ocorrencia_ID"});
  ocorrencia.hasMany(viagem_ocorrencia, { as: "viagem_ocorrencia", foreignKey: "ocorrencia_ID"});
  usuarios.belongsTo(setor, { as: "setor", foreignKey: "setor_ID"});
  setor.hasMany(usuarios, { as: "usuarios", foreignKey: "setor_ID"});
  veiculo.belongsTo(setor, { as: "setor", foreignKey: "setor_ID"});
  setor.hasMany(veiculo, { as: "veiculos", foreignKey: "setor_ID"});
  viagem.belongsTo(usuarios, { as: "usuario", foreignKey: "usuario_ID"});
  usuarios.hasMany(viagem, { as: "viagems", foreignKey: "usuario_ID"});
  viagem.belongsTo(veiculo, { as: "veiculo", foreignKey: "veiculo_ID"});
  veiculo.hasMany(viagem, { as: "viagems", foreignKey: "veiculo_ID"});
  viagem_ocorrencia.belongsTo(viagem, { as: "viagem", foreignKey: "viagem_ID"});
  viagem.hasMany(viagem_ocorrencia, { as: "viagem_ocorrencia", foreignKey: "viagem_ID"});

  return {
    ocorrencia,
    setor,
    usuarios,
    veiculo,
    viagem,
    viagem_ocorrencia,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
