const mongoose=require('mongoose');

const authorSchema=mongoose.Schema({
    name:{type:String,required:true},
    userName:{type:String, unique:true,required:true},
    password:{type:String,required:true},
    bio:String,
    website:String,
    phone:String,
    posts: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Post'
        }
     ],
     email:{type:String, required:true},
     profileImg:{type:String,default:"www.google.com"}
})




// exports.author=authorSchema;
module.exports=mongoose.model('Author',authorSchema);