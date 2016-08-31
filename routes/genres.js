var Genre = require('../models/genre.js');


module.exports = function(app) {

    app.get('/api/genres', function(req, res){
        Genre.getGenres(function(err, genres){
            if(err){
                throw err;
            }
            res.json(genres);
        });
    });

    app.post('/api/genres', function(req, res){
        var genre = req.body;
        Genre.addGenre(genre, function(err, genre){
            if(err){
                throw err;
            }
            res.json(genre);
        });
    });

    app.put('/api/genres/:_id', function(req, res){
        var id = req.params._id;
        var genre = req.body;
        Genre.updateGenre(id, genre, {}, function(err, genre){
            if(err){
                throw err;
            }
            res.json(genre);
        });
    });

    app.delete('/api/genres/:_id', function(req, res){
        var id = req.params._id;
        Genre.removeGenre(id, function(err, genre){
            if(err){
                throw err;
            }
            res.json(genre);
        });
    });
};    