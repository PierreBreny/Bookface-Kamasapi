const mongoose = require('mongoose');
const postsSchema  = new mongoose.Schema({
  author :{
    //   type  : String,
    //   required : true
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: String
  } ,
  title :{
    type  : String,
    required : true
} ,
content :{
    type  : String,
    required : true
} ,
date :{
    type : Date,
    default : Date.now
}
});
const Post = mongoose.model('Post',postsSchema);

module.exports = Post;
