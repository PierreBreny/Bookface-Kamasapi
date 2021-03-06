//APP.JS in ~/app.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const Post = require("./models/posts");

require('./config/passport')(passport)

//css
app.use("/static", express.static("public"));

//atlas
const dotenv = require('dotenv');
dotenv.config();

const UserSchema = require("./models/user");
const postsSchema = require("./models/posts");
const { collection } = require('./models/posts');

// mongoose
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected,,'))
.catch((err)=> console.log(err));

//EJS
app.set('view engine','ejs');
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({extended : false}));
//express session
app.use(session({ 
    secret : 'secret',
    resave : true,
    saveUninitialized : true
   }));

app.use(passport.initialize());
app.use(passport.session());

   //use flash
   app.use(flash());
   app.use((req,res,next)=> {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error  = req.flash('error');
   next();
   })
//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));





app.use("/static", express.static("public"));


 app.get("/hall", function (req,res) {
   Post.find({}, function(err, posts) {
     res.render("hall", {
       postsList: posts 
     })
   }) 
   
  })

  
  
  
  app.post("/", function(req, res){
    const {title, content}= req.body;
    var author= {
      id: req.user._id,
      name: req.user.name,
      username:req.user.name
    };
    let newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      author:author
    });
    newPost.save();
    res.redirect('/hall');
  
  })


// SEARCH POSTS

// app.get('/posts/search', async (req, res) => {
//   try {
//     const { search } = req.query;
//     const searchedPosts = await Post.find({ content: { $regex: search, $options: 'i' } }).populate('author').exec();
//     if (searchedPosts) {
//       res.render('searchPosts.ejs', { searchedPosts });
//     } else {
//       req.flash('error', 'The post you are searching for does not exist');
//       res.redirect('/posts');
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// SEARCH USERS

// app.get('/profiles/search', async (req, res) => {
//   try {
//     const { search } = req.query;
//     const searchedProfiles = await User.find({ username: { $regex: search, $options: 'i' } }).exec();
//     if (searchedProfiles) {
//       res.render('searchProfiles.ejs', { searchedProfiles });
//     } else {
//       req.flash('error', 'The profile you are searching for does not exist');
//       res.redirect('/posts');
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// SERVER


  app.listen(process.env.PORT || 3000, () => console.log("Server Up and running"));

