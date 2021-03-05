const router = require('express').Router()
const passport = require('passport')
const {userController} = require('../controllers/index')
const {User} = require('../models/index')


//ESTO ES /api/auth

//REGISTRO
router.post("/register", userController.create);

//LOGIN
router.post("/login", passport.authenticate("local"), (req, res) => {
    res.send(req.user);
  });

//LOGOUT
router.post("/logout", (req, res) => {
    req.logOut();
    res.sendStatus(200);
});

router.post("/emailverification", (req, res) => {
  console.log(req.body)
  User.findOne({where: req.body})
      .then(user=>{
        if(user) {
          console.log("no")
          res.send("no")}
        else {
          console.log("yes")
          res.send("yes")
        }
      })
});

//ESTÁ YA LOGUEADO EL USER??
router.get("/me", (req, res) => {
    if (!req.user) {
      return res.sendStatus(401);
    }
    res.send(req.user);
  });
  
// Don´t modify this route, keep it at the bottom.
router.use("/", function (req, res) {
    res.sendStatus(404);
});


module.exports = router