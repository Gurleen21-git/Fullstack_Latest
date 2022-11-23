const BlogPost = require("./../models/BlogPost");
module.exports = async (req, res) => {
    const blogPosts = await BlogPost.find({});
    console.log("Session -> " + req.session);
    res.render('index', {blogPosts});
  };