const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = (req, res) => {
    const { username, password } = req.body;

    // let user =  User.findOne({ username });

    console.log(req.body);
    
    User.findOne({username:username}, (error, user) => {
        console.log(user+ " , " + error);
        if (user) {
            // let isSame = await bcrypt.compare(password, User.password);
            // if(isSame) and else case
            
             bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id;
                    res.redirect("/");
                } else {
                    res.redirect("/auth/login");
                }
            })
        } else {
            res.redirect("/auth/login");
        }
    })
}