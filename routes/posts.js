const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');
const verify = require('./verifyToken');

//Get back all posts
router.get('/', verify, async (req, res) => {
    try{
        const posts = await Posts.find().limit(5);
        res.send(req.user);
    }catch(err){
        res.json({message: err});
    }
})

//Submit a Post
router.post('/', async (req, res) => {
    const post = new Posts({
        title: req.body.title,
        description: req.body.description
    });

    try{
    const savedPost = await post.save();
    res.status(201).json(savedPost);
    }catch(err){
        res.status(400).json({message: err});
        console.log("Error 404, check DB connection");
    }
});

//Specific Post
router.get('/:postId', async (req,res)=>{
    try{
        const post = await Posts.findById(req.params.postId);
        console.log(post);
        res.json(post);
    }catch (err){
        res.status(400).json({message: err});
    }
});

//Delete specific Post
router.delete('/:postId', async (req,res)=>{
    try{
        const removedPost = await Posts.deleteOne({_id: req.params.postId});
        res.json(removedPost);
    }catch (err){
        res.status(400).json({message: err});
    }
});

//Update post
router.patch('/:postId', async (req, res)=>{
    try{
        const updatedPost = await Posts.updateOne(
            {_id: req.params.postId}, 
            {$set: {title: req.body.title}});
        res.status(201).json(updatedPost);
    }catch (err){
        res.status(400).json({message: err});
    }
});

module.exports = router;