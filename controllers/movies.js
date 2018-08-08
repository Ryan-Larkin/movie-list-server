const express  = require('express');
const Movie = require('../models/movie');

module.exports = () => {
  const moviesController = express.Router();

  moviesController.get('/', (req, res) => {
    Movie.find({}).sort({title:1}).exec((err, movies) => {
      if(err) throw err;

      // This sends an array of movie objects
      res.send(movies);
    });
  });

  moviesController.post('/', (req, res) => {
    let newM = new Movie({
      apiID    : req.body.apiID,
      title    : req.body.title,
      poster   : req.body.poster,
      overview : req.body.overview
    });

    Movie.find({ apiID: req.body.apiID }).exec((err, movieFound) => {
      if (movieFound && movieFound.length > 0) {
        res.send({ wasFound : true, title : req.body.title});
      }
      else {
        newM.save(function(err) {
          if (err) throw err;

          console.log('Movie saved successfully.');
        })
        .then(data => res.send(data));
      }
    });
  });

  // eventually make this so only I can delete, add middleware for it, not essential right now
  moviesController.delete('/:id', (req, res) => {
    Movie.findByIdAndRemove(req.params.id, function(err) {
      if (err) { console.error(err); throw err; }

      console.log('Movie removed successfully.');
    })
    .then(() => res.status(204).end());
  });

  return moviesController;
};
