const User = require("./../models/User");

module.exports = async (req, res) => {
    try {
    console.log(req.body)
    await User.create(req.body);
    } catch(error) {
        console.log(error);
    }
    res.redirect("/");
};