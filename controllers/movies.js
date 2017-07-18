const express  = require('express');
const Movie = require('../models/movie');

module.exports = () => {
  const moviesController = express.Router();

  moviesController.get('/', (req, res) => {
    Movie.find( {}, (err, movies) => {
      if(err) throw err;

      let movieMap = {};// why does this have to be an object?

      movies.forEach(movie => {
        movieMap[movie._id] = movie.title;
      });

      res.send(movieMap);
    });
  });

  moviesController.post('/', (req, res) => {
    let newM = new Movie({
      title : req.body.title
    });

    newM.save(function(err) {
      if (err) throw err;

      console.log('Movie saved successfully.');
    })
    .then(data => res.send(data));
  });

  // eventually make this so only I can delete, add middleware for it, not essential right now
  moviesController.delete('/:id', (req, res) => {
    Movie.findByIdAndRemove(req.params.id, function(err) {
      if (err) throw err;

      console.log('Movie removed successfully.');
    })
    .then(() => res.status(204).end());
  });

  return moviesController;
};
