var Games = require('../models/games.js');
var Users = require('../models/userinfo.js');

module.exports = function(app) {
    app.get('/api/games', function(req, res){
        Games.getGames(function(err, games){
            if(err){
                throw err;
            }
            res.json(games);
        });
    });

    app.get('/api/games/:_id', function(req, res){
        Games.getGameById(req.params._id, function(err, game){
            if(err){
                throw err;
            }
            res.json(game);
        });
    });
	
	app.get('/api/cat/:cat', function(req, res){
        Games.getGameByCategory(req.params.cat, function(err, game){
            if(err){
                throw err;
            }
            res.json(game);
        });
    });

    app.get('/api/searchgames/:keywords', function(req, res){
        Games.searchGameByKeyword(req.params.keywords, function(err, game){
            if(err){
                throw err;
            }
            res.json(game);
        });
    });
    
    app.post('/api/games', function(req, res){
        var game = req.body;
        Games.addGame(game, function(err, game){
            if(err){
                throw err;
            }
            res.json(game);
        });
    });

    app.put('/api/games/:_id', function(req, res){
        var id = req.params._id;
        var game = req.body;
        Games.updateGame(id, game, {}, function(err, game){
            if(err){
                throw err;
            }
            res.json(game);
        });
    });

	app.put('/api/wishlist/:_id', function(req, res){
        var id = req.params._id;
        var game = req.body;
        Users.updateWishList(id, game, {}, function(err, game){
            if(err){
                throw err;
            }
            res.json(game);
        });
    });

	
    app.delete('/api/games/:_id', function(req, res){
        var id = req.params._id;
        Games.removeGame(id, function(err, game){
            if(err){
                throw err;
            }
            res.json(game);
        });
    });
 };   
    