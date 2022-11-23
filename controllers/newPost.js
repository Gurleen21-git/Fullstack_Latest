module.exports = (req,res) => {
  console.log(" New Post Session "+ req.session.userId)
    res.render("create");
};