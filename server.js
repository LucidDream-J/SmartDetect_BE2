require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const bodyParser = require("body-parser");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    connectionString :"process.env.DATABASE_URL",
    ssl: true
  }
});

db.select("*")
  .from("users")
  .then(data => {
    console.log(data);
  });

const app = express();

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send('it is working');
});

//SIGNIN
app.post("/signin", signin.handleSignin(db, bcrypt));

//REGISTER
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

//GET PROFILE
app.get("/profile/:id", (req, res) => {
  profile.handleGetProfile(req, res, db);
});

//UPDATE ENTRIES
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

//HANDLE API
app.post("/imageUrl", (req, res) => {
  image.handleApiCall(req, res);
});

//LISTEN ON PORT

let port = process.env.PORT;
if (port == null || port == ""){
  port = 3000;
}

app.listen(port, function() {
  console.log(`Server started on port: ${port}`);
});

/*

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userid --> GET = user
/image --> PUT  ---> user info ...

*/
