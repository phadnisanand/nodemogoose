const Note = require("./Note");
const { User } = require("./User.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;
function createNote(req, res) {
  if (!req.body.content) {
    return res.status(400).json({
      message: "Invalid data",
    });
  }

  const note = new Note({
    title: req.body.title || "untitled",
    content: req.body.content,
  });

  note
    .save()
    .then(function () {
      res.json(note);
    })
    .catch(function (error) {
      res.status(500).json({
        message: error.message || "some error occurred",
      });
    });
}

function findAllNotes(req, res) {
  Note.find()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (error) {
      res.status(500).json({
        message: error.message || "some error occurred",
      });
    });
}

function findNote(req, res) {
  Note.findById(req.params.id)
    .then(function (data) {
      if (!data) {
        res.status(404).json({
          message:
            error.message || "some error occurred find by id ".req.params.id,
        });
      }
      res.send(data);
    })
    .catch(function (error) {
      res.status(500).json({
        message: error.message || "some error occurred",
      });
    });
}

function deleteNote(req, res) {
  Note.findByIdAndDelete(req.params.id)
    .then(function (data) {
      if (!data) {
        return res.status(404).json({
          message: "Note with id not found " + req.params.id,
        });
      }

      res.json({
        message: "Note with id deleted " + req.params.id,
      });
    })
    .catch(function (error) {
      res.status(500).json({
        message: error.message || "some error occurred",
      });
    });
}

function updateNote(req, res) {
  const filter = { title: req.body.title };
  const newData = {
    title: req.body.title,
    content: req.body.content,
  };
  Note.findOneAndUpdate(filter, newData, { upsert: true })
    .then(function (data) {
      return res.json(newData);
    })
    .catch(function (error) {
      res.status(500).json({
        message: error.message || "some error occurred",
      });
    });
}

function loginUser(req, res) {
  const user = {
    username: req.body.username,
    email: req.body.email,
  };
  const token = jwt.sign(user, jwtSecretKey);
  res.send({ token: token });
}

const registerUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already exists");
  const newUser = await User.create(req.body);
  res.status(201).send(newUser);
};

module.exports = {
  loginUser,
  createNote,
  findAllNotes,
  findNote,
  deleteNote,
  updateNote,
  registerUser,
};
