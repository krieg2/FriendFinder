var path = require("path");
var friendData = require(path.join(__dirname + "/../data/friends.js"));

module.exports = function(app){

    // Return all friends.
    app.get("/api/friends", function(req, res){
        res.json(friendData);
    });

    // Handle the survey POST.
    app.post("/api/friends", function(req, res){

        var newFriend = req.body;

        // Convert the scores to integers.
        newFriend.scores = newFriend.scores.map(function(currentValue, index, arr){
            return parseInt(currentValue);
        });
        
        // Find the user with the least difference in score.
        let minDiff = 0;
        let minDiffIdx = -1;
        let userNameTaken = false;
        for(let i=0; i < friendData.length; i++){

            if(newFriend.name === friendData[i].name){
                userNameTaken = true;
                break;
            }
            let scoreDiff = 0;
            for(let j=0; j < 10; j++){
                scoreDiff += Math.abs(friendData[i].scores[j] - newFriend.scores[j]);
            }
            if(i === 0 || scoreDiff < minDiff){
                minDiff = scoreDiff;
                minDiffIdx = i;
            }
        }

        if(userNameTaken){
            // User name already exists.
            // Respond with an alert message.
            res.json({alert: "User name is already taken."});
        } else if(minDiffIdx !== -1){
            // Return the best match.
            res.json(friendData[minDiffIdx]);
        } else{
            // No matches.
            res.json(false);
        }

        // Store the new user.
        friendData.push(newFriend);
    });
}