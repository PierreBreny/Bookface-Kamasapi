//users.js in routes/users.js
const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const passport = require('passport');

//login handle
router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/welcome',(req,res)=>{
    res.render('welcome');
})
router.get('/register',(req,res)=>{
    res.render('register')
    })
//Register handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });
  //register post handle
  router.post('/register',(req,res)=>{
    const {name,firstName,birthday,gender,email, password, password2} = req.body;
    let errors = [];
    console.log(' Name: ' + name + ' Birthday: ' + birthday + ' First name: '+ firstName + ' Gender: '+ gender +' email: ' + email+ ' pass: ' + password);
    if(!name || !firstName || !gender || !birthday || !email || !password || !password2) {
        errors.push({msg : "Please fill in all fields"})
    }
    //check if match
    if(password !== password2) {
        errors.push({msg : "passwords dont match"});
    }
    
    //check if password is more than 6 characters
    if(password.length < 6 ) {
        errors.push({msg : 'password atleast 6 characters'})
    }
    if(errors.length > 0 ) {
    res.render('register', {
        errors : errors,
        name : name,
        firstName : firstName,
        birthday : birthday,
        gender : gender,
        email : email,
        password : password,
        password2 : password2})
     } else {
        //validation passed
       User.findOne({email : email}).exec((err,user)=>{
        console.log(user);   
        if(user) {
            errors.push({msg: 'email already registered'});
            res.render('register',{errors,name,firstName,birthday,email,gender,password,password2})  
           } else {
            const newUser = new User({
                name : name,
                firstName : firstName,
                birthday : birthday,
                gender : gender,
                email : email,
                password : password
            });
    
            //hash password
            bcrypt.genSalt(10,(err,salt)=> 
            bcrypt.hash(newUser.password,salt,
                (err,hash)=> {
                    if(err) throw err;
                        //save pass to hash
                        newUser.password = hash;
                    //save user
                    newUser.save()
                    .then((value)=>{
                        console.log(value)
                        req.flash('success_msg','You have now registered!')

                    res.redirect('/users/login');
                    })
                    .catch(value=> console.log(value));
                      
                }));
             }
       })
    }
    })
//logout
router.get('/logout',(req,res)=>{
    req.logout();
req.flash('success_msg','Now logged out');
res.redirect('/users/login');
 })
module.exports  = router;