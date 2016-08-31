var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  facebook: {
  	id: String,
  	token: String,
  	name: String,
	email: String
  },
  wishlist: [{
  	id: String,
  	title: String,
	description: String,
    img_url: String
  }]
});


var Users = module.exports = mongoose.model('Users', userSchema);

module.exports.getUsers = function(callback, limit){
    Users.find(callback).limit(limit);
}

module.exports.getUserById = function(id, callback){
    Users.findById(id, callback);
}

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


