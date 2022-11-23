require("dotenv").config();

const express = require("express");
const mongoStore= require("connect-mongo")
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const expressSession = require("express-session");
// const bodyParser = require("body-parser"); // this is in express now
const BlogPost = require("./models/BlogPost");
// const { findById } = require("./models/BlogPost");
const fileUpload = require("express-fileupload");
const customValidate = require('./middleware/customValidate');
const auth = require("./middleware/auth");
const redirectIfAuth = require("./middleware/redirectIfAuth")
const loggedInMiddleware = require("./middleware/loggedIn");
const newPostController = require("./controllers/newPost");
const homeController = require ("./controllers/home");
const getPostController = require ("./controllers/getPost");
const storePostController = require ("./controllers/storePost");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/loginController");
const loginUserController = require("./controllers/loginUsers");

const app = new express();

global.loggedIn = null;

app.use(expressSession(
  {secret: "kathi537", 
  resave: false,
  saveUninitialized: true,
  store: mongoStore.create({mongoUrl:process.env.MONGO_URL})}
  ));
app.use("*", loggedInMiddleware)
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
app.use(express.static("public"));
app.use(customValidate);
app.set("view engine", "ejs");


mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true }
  );

const port = 4000;

app.get("/", homeController);

app.get("/post/:id", getPostController);

app.get("/posts/new", auth, newPostController);

app.post("/posts/store", storePostController);

app.get("/auth/register", redirectIfAuth, newUserController);

app.post("/users/register", redirectIfAuth, storeUserController);

app.get("/auth/login", redirectIfAuth, loginController);

app.post("/users/login", redirectIfAuth, loginUserController);

// app.post("/posts/store", async(req,res) => {
//   // res.render('create');
//   console.log(req.body);
//   try {
//     await BlogPost.create({
//       title:req.body.title,
//       body:req.body.body,
//       username:"StarStar"
//     })
//   }catch (e) {
//     console.log(e)
//   };


// BlogPost.create(req.body, (error, blogpost) => {
//     console.log(error,blogpost);
//     res.redirect("/");
// });
// });

app.listen(port, () => {
  console.log("App Listening on Port " + port);
});
