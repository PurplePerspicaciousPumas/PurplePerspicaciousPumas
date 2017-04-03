var models = require('./index.js');
var users = models.db.collection('usermodels');

module.exports.addFriendToList = function(friend, currentUser) {
	// return users.findOne({username: currentUser})
	// 	.then((data) => {
	// 		if (data.friendList.indexOf(friend) < 0) {
	// 			users.update({username: currentUser}, {$push: {"friendList": friend}});
	// 		}

	// 		return data;
	// 	});
	return users.findOneAndUpdate({username: currentUser}, {$push: {friendList: friend}}, {returnOriginal: false});
};

module.exports.selectUserByName = function(username) {
	return users.findOne({username: username})
		.catch((err) => {
			console.log('Error selecting user by name!', err);
		});
};
