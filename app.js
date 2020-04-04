//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const postsArray = [];

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  // main route where get request is maintained
  res.render("home", {
    startingContent: homeStartingContent, // this will be the starting content even if ther is no post in the array
    postsArray: postsArray,
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  // compose get request is handled
  res.render("compose");
});

app.post("/compose", function (req, res) {
  // get the post title and content froom the form and creates an object using that data
  // and the pushes that object into an array. so each time a post is created an object is created
  // dynamically and is pushed to the global array. Then this redirects to the home route
  // the the data   is displayed using foreach loop using ejs templating.
  const Posts = {
    Title: req.body.postTitle,
    postContent: req.body.postBody,
  };
  postsArray.push(Posts);
  res.redirect("/");
});

app.get("/posts/:postTitle", function (req, res) {
  let requestTitle = _.lowerCase(req.params.postTitle);
  postsArray.forEach(function (posts) {
    // posts is a variable and postArray is an array of objects
    // iterates throug eacch posst using for each and the passes the data back to post.ejs
    if (_.lowerCase(posts.Title) === requestTitle) {
      res.render("post", {
        postTitle: posts.Title,
        postContent: posts.postContent,
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
