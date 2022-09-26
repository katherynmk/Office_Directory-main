const Professor = require("../models/user")

exports.updateUser = function(username,Password) {
    var newvalues = { $set: {username:  username1, Password: password1} };
    Professor.findOneAndUpdate({"username":req.params["username"]},newvalues , (error,users) => {
        if (error) next(error);

    });
}