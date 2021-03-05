const express = require("express");
const helmet = require("helmet");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const path = require("path");
const morgan = require('morgan')
const db = require('./config/db')

const app = express();

const routes = require("./routes");
const config = require("./config/server.config.js");
const {User, Film} = require("./models/index");

app.use(helmet());
app.use(morgan('tiny'))
// Express Route File Requires


//app.use(express.static(path.resolve(__dirname, "./src/public")));
app.use(cors()); // esta librería es para poder trabajar front con back en localhost

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  sessions({
    secret: "omdbase",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ where: { email }, include: Film})
        .then((user) => {
          if (!user) {
            // email not found
            return done(null, false);
          }

          user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false); // wrong password
            }
            
            return  done(null, user);// success :D
          })
        })
        .catch(done); // done(err)
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("--serialize--")
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log("--deserialize--")
  User.findOne({where: {id}, include: Film})
    .then((user) => {
        done(null, user);
    })
    .catch(done);
});


// Express Routing
app.use("/api", routes);
app.get("/*", (req, res) => {
  res.send("hola")
});

// error middleware -> https://expressjs.com/es/guide/error-handling.html
app.use((err, req, res, next) => {
  res.status(404).send(err.message);
  console.log(err)
  //res.sendStatus(404).send(err);
})

db.sync({ force: false }).then(() => {
  http.createServer(app).listen(config.port, () => {
    console.log(`Server listening at port ${config.port}`);
  });
});

