const dotenv = require('dotenv').config({ path: '.env' });
var express = require('express');
const cors = require('cors');
var bodyParser     = require('body-parser');
const app = express();
const userRoutes  = require("./routes/user.routes.js");
const userController = require("./controllers/user.controller.js");
const auth = require("./middleware/auth");
const PORT = process.env.PORT ? process.env.PORT : 5000;
const db = require("./models");
const session = require('express-session');

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(express.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_TOKEN }));



db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

var corsOptions = {
  origin: "http://localhost:8081"
};
app.set('view engine', 'ejs');
// app.set('views', 'ejs');

//route for index page
app.get("/", userController.loadIndex);
app.get("/login", userController.loadLogin);
app.post("/login", userController.verifyLogin);
app.get("/sign-up", userController.loadSignup);
app.post("/sign-up", userController.doSignup);
app.get("/profile", auth.isLogin, userController.loadProfile);
app.get("/logout", auth.isLogin, userController.logout);
app.get("/buds", auth.isLogin, userController.loadBuds);
app.get("/games", auth.isLogin, userController.loadGames);
app.get("/buds/:id", auth.isLogin, userController.loadBud);


app.use(express.static("public"));

app.use("/api/users", auth.isLogin, userRoutes);

app.listen(PORT, () =>
  console.log(`server running on port: http://localhost:${PORT}`)
);


