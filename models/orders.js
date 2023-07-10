const Sequelize = require('sequelize');   

const sequelize = require('../util/database');

const Order = sequelize.define('orders', { 
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tableNo: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  dish: {
    type: Sequelize.STRING,
    allowNull: false
  }

});

module.exports = Order;  