const Sequelize = require('sequelize');

const sequelize = new Sequelize('diario_de_bordo', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql',
    schema: 'diario_de_bordo'
});

module.exports = sequelize;