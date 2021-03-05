const User = require('./Users')
const Film = require('./Films')


User.belongsToMany(Film, {through: 'UserFilms'})
Film.belongsToMany(User, {through: 'UserFilms'})

module.exports = {User, Film}