const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

const bcrypt = require("bcrypt");

class User extends Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  getFavs(){
    return this.getFilms()
  }
}

User.init(
  {
    firstName:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    salt: {
      type: DataTypes.STRING,
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get(){
            let fName = this.getDataValue('firstName')
            let mName = this.getDataValue('middleName')
            let lName = this.getDataValue('lastName')
            return fName + (mName? ` ${mName} ` : " ") + lName      
        }
    },
  
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
  }
);

User.beforeCreate((user) => {
  return bcrypt
    .genSalt(16)
    .then((salt) => {
      user.salt = salt;
      return user.hash(user.password, salt);
    })
    .then((hash) => {
      user.password = hash;
    });
});

module.exports = User;