const {User, Film} = require("../models/index")
const passport = require("passport");


const create = (req,res,next) => {
    User.create(req.body)
        .then((user)=> {
            //cuando se crea el usuario, inmediatamente se loguea
            passport.authenticate('local')(req, res, function () {
                //req.user tiene ya un array (aunque vacío) de favoritas
                res.status(201).json(req.user);
            })
        })
        .catch(next)
}

const addFav = (req,res,next) => {
    let id = Number(req.params.id)
    if(!req.user) return res.sendStatus(401);
    Film.findOrCreate({where: req.body})
        .then((film)=> {
            User.findOne({where: {id}})
                .then(user => user.addFilm(film[0]))
                .then(()=>User.findOne({where: {id}, include: Film})) //volver a buscar el usuario para mandarlo con todas las películas
                .then(u => res.send(u))
        })
        .catch(next)
}

const removeFav = (req,res,next) => {
    let id = Number(req.params.id)
    if(!req.user) return res.sendStatus(401);
    Film.findOne({where: {imdbId: req.params.favId}})
        .then((film)=> {
            User.findOne({where: {id}})
                .then(user => user.removeFilms(film))
                .then((film)=> {
                    console.log("film", film)
                    return User.findOne({where: {id}, include: Film})}) //volver a buscar el usuario para mandarlo con todas las películas
                .then(u => res.send(u))
        })
        .catch(next)
}


module.exports = {create, addFav, removeFav}