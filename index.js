const mongoose = require('mongoose');
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt');
app.use(bodyParser.json());
const serveStatic = require('serve-static');
app.use(serveStatic(__dirname + "/dist"));


const Post = require('./models/postModel');
const Author=require('./models/authorModel')




const port = 8080 || process.env.PORT;
app.listen(port);

    

const url="mongodb://manish:manish97@ds263832.mlab.com:63832/blog-app-server";

mongoose.Promise = global.Promise;
//  || "mongodb://127.0.0.1:27017/hcc-blog-app"
// Connect to MongoDB
mongoose.connect(url , {
    useNewUrlParser: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch((err) => {
    console.log(err);
})




// Get all posts
app.get('/posts', (req, res) => {
    Post.find({}).populate('author').exec((err,result)=>{
        if(err)
            res.status(202).send(err);
        res.json(result);
    })


})

// Get a certain post by title
app.get('/posts/:id',(req,res)=>{
 
    Post.findById(req.params.id).populate('author').exec((err,result)=>{
        if(err)
            res.status(202).send(err);
        res.json(result);
    })
     

})

//save a post
app.post('/posts', (req, res) => {
    Author.find({userName:req.body.userName},(err,result)=>{
        if(err)
             res.json("No author with the given username found");
             
        let comments=[];
        let tags=[];
    
        //if a comment is present, push it into the array and save into database
        if(req.body.comment)
            comments.push(req.body.comment)
    
        //if a tag is present, push it into the array and save into database
        if(req.body.tags)
            //tags.push(req.body.tag);
            tags=req.body.tags
    
        const newPost = new Post({
            title: req.body.title,
            body: req.body.body,
            imageUrl: req.body.imageUrl,
            author:result[0]._id,
            comments:comments,
            tags:tags
        })
        //console.log(result[0]);
        result[0].posts.push(newPost._id);
       newPost.save();
       result[0].save();
        res.json(newPost);
    })

    
    
  
})


//Save author details
app.post('/authors', async (req, res) => {


    let author=await Author.findOne({email:req.body.email});
    if(author)
        return res.status(400).send('User already registered');

    const salt=await bcrypt.genSalt(10);
    const hashedValue=await bcrypt.hash(req.body.password,salt);
    author=new Author({
        email:req.body.email,
        password:hashedValue,
        userName:req.body.userName,
        name:req.body.name,
        bio:req.body.bio,
        website:req.body.website,
        phone:req.body.phone,
        profileImg:req.body.profileImg
    })
    await author.save();
     res.json(author);
});

//Get all posts of an author
app.get('/authors/posts/:authorID',(req,res)=>{
    Author.findById(req.params.authorID).populate('posts').exec((err,result)=>{
        if(err)
            res.status(202).send(err);
        res.json(result);
    })
})

// Update Author
app.post('/authors/update',async(req,res)=>{
   let author=await Author.find({'userName':req.body.userName}).populate('posts');
    if(!author)
        return res.status(400).send('An Error Occured! Please try again later.');

    if(req.body.password){
        const salt=await bcrypt.genSalt(10);
        const hashedValue=await bcrypt.hash(req.body.password,salt);
        author[0].password=hashedValue;
    }
    if(req.body.profileImg)
        author[0].profileImg=req.body.profileImg;
    if(req.body.website)
        author[0].website=req.body.website;
    if(req.body.website)
        author[0].phone=req.body.phone;
    if(req.body.bio)
        author[0].bio=req.body.bio;   

    const newResult=await author[0].save();
    res.json(newResult);    
     
})

// Get Author Details
app.get('/authors/:username',(req,res)=>{
    Author.find({userName:req.params.username}).populate('posts').exec((err,result)=>{
        if(err)
            res.status(202).send(err);
        res.json(result);
    })
})

// Get All Author Details
app.get('/authors/',(req,res)=>{
    Author.find({}).exec((err,result)=>{
        if(err)
            res.status(202).send(err);
        res.json(result);
    })
})


// Get all posts by a tag
app.get('/posts/tags/:tag',(req,res)=>{
    let newPosts=[]
    Post.find({}).populate('author').exec(function(error, result){
        if(error)
             res.json(error);

             result.map(post=>{
                if(post.tags.includes(req.params.tag))
                    newPosts.push(post)
                })
            if(newPosts.length==0)
                res.status(404).send('No posts with the given tag found');
            else
                res.json(newPosts);
               
    })
  
})

// Add Comments
app.post('/posts/post',async (req,res)=>{
 
    let result=await Post.find({'_id':req.body.id}).populate('posts');
    // res.json(result
    if(!result)
        res.status(400).send("An error occured!");

        let commentObject={
            name:req.body.name,
            comment:req.body.comment
        }
        result[0].comments.push(commentObject);
        result[0].save();
        res.json(result[0]);

     

})

// Signin
app.post('/authors/signin', async (req, res) => {
    let author=await Author.find({'email':req.body.email}).populate('posts');
    if(!author)
        return res.status(400).send('No User found with the given email'); 


    const validPassword=await bcrypt.compare(req.body.password,author[0].password);
    if(!validPassword)
        return res.status(400).send("The Email or Password Provided is Incorrect");

    res.json(author[0]);
    
});

