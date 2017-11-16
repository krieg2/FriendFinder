var friendData = require("../data/friends.js");

module.exports = function(app){

	app.get("/api/friends", function(req, res) {
		res.json(friendData);
	});

	app.post("/api/friends", function(req, res) {
/*
{ name: 'Tobias',
  photo: 'http://cdn1.alloy.com/wp-content/uploads/2013/05/tobias-funke.png',
  'scores[]': [ '1', '2', '3', '4', '5', '4', '3', '2', '1', '1' ] }
  */

  		var newFriend = req.body;
  		newFriend.scores = newFriend.scores.map(function(currentValue, index, arr){
  			return parseInt(currentValue);
  		});
		console.log(newFriend);
		friendData.push(newFriend);
		res.json(friendData);
	});
}