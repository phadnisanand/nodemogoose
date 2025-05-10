const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const bodyParser = require("body-parser");
const middleware = require("./src/middleware");
const controllers = require("./src/controller");
// create express app
const app = express();
// parse if application/json
app.use(bodyParser.json());

// parse application/x-www-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost:27017/notes")
  .then(function () {
    console.log("connected to database");
  })
  .catch(function (error) {
    console.log("could not connect to db", error);
    process.exit();
  });

app.get("/", function (req, res) {
  res.send("hello");
});

app.post("/login", (req, res) => {
  controllers.loginNote(req, res);
});

app.post("/create", middleware.verifyToken, function (req, res) {
  jwt.verify(req.token, jwtSecretKey, (err, authData) => {
    if (err) {
      res.send({ result: "invalid token" });
    } else {
      controllers.createNote(req, res);
    }
  });
});

app.get("/notes", middleware.verifyToken, function (req, res) {
  jwt.verify(req.token, jwtSecretKey, (err, authData) => {
    if (err) {
      res.send({ result: "invalid token" });
    } else {
      controllers.findAllNotes(req, res);
    }
  });
});

app.get("/note/:id", middleware.verifyToken, function (req, res) {
  jwt.verify(req.token, jwtSecretKey, (err, authData) => {
    if (err) {
      res.send({ result: "invalid token" });
    } else {
      controllers.findNote(req, res);
    }
  });
});

app.put("/updatenote", middleware.verifyToken, function (req, res) {
  jwt.verify(req.token, jwtSecretKey, (err, authData) => {
    if (err) {
      res.send({ result: "invalid token" });
    } else {
      controllers.updateNote(req, res);
    }
  });
});

app.delete("/deleteNote/:id", middleware.verifyToken, function (req, res) {
  jwt.verify(req.token, jwtSecretKey, (err, authData) => {
    if (err) {
      res.send({ result: "invalid token" });
    } else {
      controllers.deleteNote(req, res);
    }
  });
});

app.post("/register", async (req, res) => {
  controllers.registerUser(req, res);
});

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("app is running on port", PORT);
});
