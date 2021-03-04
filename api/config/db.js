const { Sequelize } = require('sequelize');

const db = new Sequelize("postgres://postgres@localhost:5432/omdb", {
    host: 'localhost',
    //dialect: 'postgres',
    logging: false, 
  });

  module.exports = db