//USER.JS in MODELS/USER.JS
const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
  name :{
      type  : String,
      required : true
  } ,
  email :{
    type  : String,
    required : true
} ,
password :{
    type  : String,
    required : true
} ,
date :{
    type : Date,
    default : Date.now
} ,
firstName :{
    type  : String,
    required : true
} ,
birthday:{
    type  : String,
    required : true
},

gender:{
    type  : String,
    required : true
},
country:{
    type : String,
    required : true
},
city:{
    type:String,
    required : true
},
bio:{type:String,
    required : true
    
}
});
const User= mongoose.model('User',UserSchema);

module.exports = User;