const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require("../config/auth.js");
const User = require("../models/user");

//login page
router.get('/', (req,res)=>{
    res.render('welcome');
})
//register page
router.get('/register', (req,res)=>{
    res.render('register');
})

//dashboard page
router.get('/dashboard', ensureAuthenticated ,(req, res) =>{
  res.render('dashboard', {
    user: req.user
  });
})

 //User profile
  
 router.get('/show', function (req, res){
    User.findById(req.params.id, function (err, foundUser){
      if(err) {
        req.flash("error", "something went wrong");
        res.redirect("/");
      }
      res.render('show',{
       user: req.user});
    });
  });



module.exports = router; 