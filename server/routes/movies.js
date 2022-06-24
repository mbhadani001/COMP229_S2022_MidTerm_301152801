/* Name : Manav Rajeshbhai Bhadani
Student I'd : 301152801
Project : Midterm-test*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// call the movies model
let movies = require('../models/movies');



/* GET movies List page. READ */
router.get('/', (req, res, next) => {
  // find all movie in the books collection
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

});

/* GET myfavourit-movies List page. READ */
router.get('/details', (req, res, next) => {
  // find all movie in the movies collection
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

});

//  GET the Movies add page in order to add a new Movies
router.get('/add', (req, res, next) => {

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
});


// POST process the Movies add page and create a new Movies - CREATE
router.post('/add', (req, res, next) => {

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

});



// GET the Movies Details page in order to edit an existing Movies

router.get('/edit/:id', (req, res, next) => {

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
});       


// POST - process the information passed from the details form and update the document

router.post('/edit/:id', (req, res, next) => {

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

});




// GET - process the delete by user id

router.get('/delete/:id', (req, res, next) => {

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
});


module.exports = router;
