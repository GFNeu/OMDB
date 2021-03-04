const {User} = require("../models/index")
const passport = require("passport");


const create = (req,res,next) => {
    console.log("hola")
    User.create(req.body)
        .then((user)=> {
            passport.authenticate('local')(req, res, function () {
                res.status(201).json(user);
            })
        })
        .catch(next)
}


module.exports = {create}