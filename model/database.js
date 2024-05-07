const Sequelize = require('sequelize');

const sequelize = new Sequelize('database_diario_de_bordo', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;