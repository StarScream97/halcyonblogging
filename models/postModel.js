const mongoose=require('mongoose');
const moment=require('moment');

const postSchema=mongoose.Schema({
    title:String,
    body:String,
    imageUrl:{type:String,default:"https://images5.alphacoders.com/713/thumb-1920-713442.jpg"},
    date:{type:String, default:moment().format('MMMM Do YYYY, h:mm:ss a')},
    tags:[{type:String,default:''}],
    comments:[{name:'',comment:''}],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Author',
    },
    likes:{type:Number,default:0}
})

module.exports=mongoose.model('Post',postSchema);