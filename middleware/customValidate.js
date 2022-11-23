const customValidate = (req, res, next) => {
    console.log("Custom Validate was fired");
    // if(req.body.title == null) {
    //     console.log("Blog Post is invalid");
    //     req.body.title = "Inserted title";
    //     // return res.redirect("/posts/new");
    // }
    next();
};

module.exports = customValidate;