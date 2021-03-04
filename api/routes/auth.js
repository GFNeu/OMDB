const router = require('express').Router()
const passport = require('passport')
const {userController} = require('../controllers/index')


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