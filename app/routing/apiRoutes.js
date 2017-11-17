var path = require("path");
var friendData = require(path.join(__dirname + "/../data/friends.js"));

module.exports = function(app){

    app.get("/api/friends", function(req, res){
        res.json(friendData);
    });

    app.post("/api/friends", function(req, res){

        var newFriend = req.body;

        // Convert the scores to integers.
        newFriend.scores = newFriend.scores.map(function(currentValue, index, arr){
            return parseInt(currentValue);
        });
        
        // Find the user with the least difference in score.
        let minDiff = 0;
        let minDiffIdx = -1;
        for(let i=0; i < friendData.length; i++){
            let scoreDiff = 0;
            for(let j=0; j < 10; j++){
                scoreDiff += Math.abs(friendData[i].scores[j] - newFriend.scores[j]);
            }
            if(i === 0 || scoreDiff < minDiff){
                minDiff = scoreDiff;
                minDiffIdx = i;
            }
        }

        // Return the best match.
        if(minDiffIdx !== -1){
            res.json(friendData[minDiffIdx]);
        }

        // Store the new user.
        friendData.push(newFriend);
    });
}