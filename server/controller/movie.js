let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let movies = require('../models/movies');

module.exports.displayMovieList = (req, res, next) => {
    movies.find( (err, list) => {
        if (err) {
          return console.error(err);
        }
        else {
          res.render('movies/index', {
            title: 'Movies',
            list: list
          });
        }
      });
}

module.exports.displayAddPage = (req, res, next) => {
    let newMovie = movies({
        "title": req.body.title,
        "description": req.body.description,
        "released": req.body.released,
        "director": req.body.director,
        "genre": req.body.genre
      });
    
     
    
        res.render('movies/details', {
          title: 'Add Movie',
          page: 'Add Movie', 
          movies: newMovie
    
      });        
}

module.exports.processAddPage = (req, res, next) => {
    let newMovie = movies({
        "Title": req.body.title,
        "Description": req.body.description,
        "Released": req.body.released,
        "Director": req.body.director,
        "Genre": req.body.genre
    });
    
    movies.create(newMovie, (err, list) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/movies');
        }
    });
    

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    movies.findById(id, (err, moviesToEdit) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          //show the edit view
          res.render('movies/details', {
            title: 'Edit Movie',
            page: 'Edit Movie', 
            movies: moviesToEdit
      
        });    
      }
  });
}


module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updateMovie =  movies({
      "_id": id,
      "Title": req.body.title,
      "Description": req.body.description,
      "Released": req.body.released,
      "Director": req.body.director,
      "Genre": req.body.genre
  });
  
  movies.updateOne({_id: id}, updateMovie, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          res.redirect('/movies');
      }
  });
    
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    movies.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the book list
             res.redirect('/movies');
        }
    });
}

module.exports = router;
