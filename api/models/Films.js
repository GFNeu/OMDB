const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class Film extends Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
}

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