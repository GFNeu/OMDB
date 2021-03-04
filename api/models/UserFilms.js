const S = require("sequelize")
const db = require('../config/db');

class UserFilms extends S.Model {}
UserFilms.init({
    status: {
        type: S.ENUM('null', 'wishlist', 'seen'),
        defaultValue: null
    },
    isFav: {
        type: S.BOOLEAN,
        defaultValue: false
    },
    userRating: {
        type: S.INTEGER,
        defaultValue: null
    }
},{sequelize: db, modelName: 'UserFilms'})

module.exports = UserFilms;