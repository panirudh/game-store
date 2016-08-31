var Users = require('../models/userinfo.js');

module.exports = function(app) {
    app.get('/api/users', function(req, res){
        Users.getUsers(function(err, users){
            if(err){
                throw err;
            }
            res.json(users);
        });
    });
    
    app.get('/api/user/:_id', function(req, res){
        Users.getUserById(req.params._id, function(err, game){
            if(err){
                throw err;
            }
            res.json(game);
        });
    });
	
	
 }; 
