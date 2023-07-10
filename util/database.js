

const Sequelize = require('sequelize');

const sequelize = new Sequelize('restaurant_app','root','', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;