var mongoose = require("mongoose");
mongoose.connect("mongodb://root:root@ds019926.mlab.com:19926/gamescollection");

mongoose.set("debug", true);

module.exports.User = require("./user");