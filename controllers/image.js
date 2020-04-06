const Clarifai = require("clarifai");


const app = new Clarifai.App({ apiKey: process.env.APIKEY});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json("unable to work with api");
    });
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  console.log(id);
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(404).json("Unable to set entries"));
};

module.exports = {
  handleImage,
  handleApiCall
};
