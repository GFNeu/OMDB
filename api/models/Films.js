const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class Film extends Model {}

Film.init(
  {
    imdbId:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // connection instance
    modelName: "Film", // model name
  }
);

module.exports = Film;