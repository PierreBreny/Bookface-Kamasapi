

    const express = require("express");
    const app = express();
    const mongoose = require ("mongoose");
    // const bodyParser= require ("body-parser");
    const ejs = require ('ejs');

    app.set('view engine', 'ejs'); 

    // app.use(bodyParser.urlencoded({extended:true}));
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());


    // app.use(express.static("public"));
    app.use("/static", express.static("public"));

    mongoose.connect("mongodb+srv://kamys9:kamasapi123@cluster0.z5ahr.mongodb.net/test", {useNewUrlParser: true}, { useUnifiedTopology: true});
    // mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
      // console.log("Connected to db!");

      app.use("/static", express.static("public"));

    //create a data schema
    const postsSchema = {
      title: String,
      content: String,
      name: String,
      date: String,
      

    }

    const Post = mongoose.model("Post", postsSchema);


    // app.get("/", function (req,res) {
      
    //   res.render("hall.ejs")
    // })

    // app.get("/", function (req,res) {
    //   // res.send("Hello worlddd!")
    //   res.sendFile(__dirname + "/index.html");
    // })

    app.get("/", function (req,res) {
     Post.find({}, function(err, posts) {
       res.render("hall", {
         postsList: posts 
       })
     }) 
     
    })
    
    
   app.post("/", function(req, res){
      let newPost = new Post({
        title: req.body.title,
        content: req.body.content
      });
      newPost.save();
      res.redirect('/');
    
    })



    app.listen(3000, function() {
      console.log("server is running on 3000");
    })



    

