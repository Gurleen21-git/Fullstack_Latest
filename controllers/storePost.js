const BlogPost = require("./../models/BlogPost");
const path = require("path");
module.exports = (req,res) => {
    // res.render('create');
    let image = req.files.image
    image.mv(path.resolve(__dirname, "public/img", image.name), async (error) => {
      await BlogPost.create({...req.body, image: "/img/"+ image.name});
      res.redirect("/");
    });
    // console.log(req.body);
    // BlogPost.create({
    //   title:req.body.title,
    //   body:req.body.body,
    //   username:"StarStar"
    // }, (error, blogpost) => {
    //     console.log(error,blogpost);
    //     res.redirect("/");
    // });
  };