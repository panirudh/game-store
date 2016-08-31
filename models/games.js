var mongoose = require('mongoose');

var gamesSchema = mongoose.Schema({

    title:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    description:{
        type:String
    },
    publisher:{
        type:String
    }, 
	platform:{
        type:String
    },
	asin:{
        type:String
    },
	rating:{
        type:String
    },
    img_url:{
        type:String
    },
    buy_url:{
        type:String
    },
    create_date:{
        type: Date,
        default:Date.now
    },

});

var Games = module.exports = mongoose.model('Games', gamesSchema);

module.exports.getGames = function(callback, limit){
    Games.find(callback).limit(limit);
}

module.exports.getGameById = function(id, callback){
    Games.findById(id, callback);
}

module.exports.getGameByCategory = function(options, callback){
    Games.find( { "category": options }, callback );
}

module.exports.searchGameByKeyword = function(options, callback){
    Games.find( {$text: {$search: options}}, callback );
}



module.exports.addGame = function(game, callback){
    Games.create(game, callback);
}

module.exports.updateGame = function(id, game, options, callback){
    var query = {_id: id};
    var update = {
        title:game.title,
        category:game.category,
        description:game.description,
        publisher:game.publisher,
        platform:game.platform,
        img_url:game.img_url,
        buy_url:game.buy_url,
        rating:game.rating,
		asin:game.asin
    }
    Games.findOneAndUpdate(query, update, options, callback);
}


module.exports.removeGame = function(id, callback){
    var query = {_id: id};
    Games.remove(query, callback);
}

var Users = require('../models/userinfo.js');

module.exports.updateWishList = function(id, game, options, callback){
	console.log(id);
    var query = {_id: id};
	
    var update = {$push: { "wishlist": {
        id:game._id,
        title:game.title,
        description:game.description,
        img_url:game.img_url,
    }}}	
    Users.findOneAndUpdate(query, update, options, callback);
}