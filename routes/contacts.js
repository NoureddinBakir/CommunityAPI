const express = require('express');
const router = express.Router();
const Community = require('../models/community');
const Contacts = require('../models/contacts');
const Chats = require('../models/chats');
const Messages = require('../models/messages');
const verify = require('./verifyToken');

//Get Contact
router.get('/', verify, async (req, res) => {
    if(req.contact._id != req.body._id){
        return res.send("Cannot get other contact data!");
    }

    try {
        const foundContact = await Contacts.findById(req.body._id);

        //don't send the password
        const responsContact = {
            _id: foundContact._id,
            groups: foundContact.groups,
            name: foundContact.name,
            email: foundContact.email,
            number: foundContact.number,
            role: foundContact.role,
            personalInfo: foundContact.personalInfo,
            managedContacts: foundContact.managedContacts
        }
        res.json(responsContact);
    } catch (error) {
        res.status(400).json({message: error});
    }
});
// Create new contact
router.patch('/', verify, async (req, res) => {
    try {
        const updatedContact = await Contacts.updateOne({_id: req.contact._id},{
            contactId : req.body.contactId,
            groups: req.body.groups,
            name : req.body.name,
            email : req.body.email,
            number : req.body.number,
            role : req.body.role,
            personalInfo: {
                dob: req.body.personalInfo.dob,
                accessibility: req.body.personalInfo.accessibility
            },
            managedContacts: req.body.managedContacts
        }).select("-password");
        
        res.json(updatedContact);
    }catch(err){
        res.status(400).json(`Failed, message: ${err}`);
    }
})


// Post Chats
router.post('/chats', verify,  async (req, res)=>{
    const chat = new Chats({
        members: req.body.members,
        title: req.body.title,
        image : req.body.image
    })

    try {
        const savedChat = await chat.save();
        res.status(200).json(savedChat);
    } catch (error) {
        res.status(400).json({message: error});
    }
})
// Get chats
router.get('/chats', verify, async (req, res) =>{
    try {
        const chat = await Chats.findOne({name: req.body.chatName});
        if(chat.members.includes(toString(req.contact._id))) {
            return res.json(`You cannot access chat ${req.contact._id}`);
        }

        res.json(chat);
    } catch (err) {
        res.json(`${err}`);
    }
})

//Post Messages
router.post('/messages', verify,  async (req, res)=> {
    const message = new Messages({
        chatId: req.body.chatId,
        text: req.body.text,
        image : req.body.image,
        sender : req.contact._id,
        sent : Date.now()
    });

    try {
        const savedMessage = await message.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(400).json({message: err});
    }
})
// Get messages with chatId
router.get('/messages', verify, async (req, res)=> {
    try {
        const messages = await Messages.find({chatId: req.body.chatId}).sort({_id:+1});
        res.json(messages);
    } catch (err) {
        res.status(400).json({message: err});
    }
})

// //Get community data
// router.get('/brother',verify,  async (req, res) => {
//     try {
//         const foundUser = await Users.findOne({_id: req.user._id});
//         const brotherUser = await Users.findById({_id: foundUser.brother});
//         res.send(`Your name is ${foundUser.name} & ${brotherUser.name}`);
//     } catch (err) {
//         res.json({message: err});  
//     }
// })

// //Get back all community
// router.get('/', verify, async (req, res) => {
//     try {
//         res.json('You need to specify your community ID: /communityID');
//     } catch (err) {
//         res.json({message: err} +' Solve this by specifying your community ID: /communityID');  
//     }
// })

// router.get('/:communityId', async (req, res) => {
//     console.log(`Github we r here ` + req.params.communityId);
//     try{
//         const community = await community.find().limit(5);
//         res.send(community);
//     }catch(err){
//         res.json({message: err} +' Solve this by specifying your community ID: /communityID');
//     }
// })

// //Submit a Post
// router.post('/', async (req, res) => {
//     const post = new community({
//         title: req.body.title,
//         description: req.body.description
//     });

//     try{
//     const savedPost = await post.save();
//     res.status(201).json(savedPost);
//     }catch(err){
//         res.status(400).json({message: err});
//         console.log("Error 404, check DB connection");
//     }
// });

// //Specific Post
// router.get('/:postId', async (req,res)=>{
//     try{
//         const post = await community.findById(req.params.postId);
//         console.log(post);
//         res.json(post);
//     }catch (err){
//         res.status(400).json({message: err});
//     }
// });

// //Delete specific Post
// router.delete('/:postId', async (req,res)=>{
//     try{
//         const removedPost = await community.deleteOne({_id: req.params.postId});
//         res.json(removedPost);
//     }catch (err){
//         res.status(400).json({message: err});
//     }
// });

// //Update post
// router.patch('/:postId', async (req, res)=>{
//     try{
//         const updatedPost = await community.updateOne(
//             {_id: req.params.postId}, 
//             {$set: {title: req.body.title}});
//         res.status(201).json(updatedPost);
//     }catch (err){
//         res.status(400).json({message: err});
//     }
// });

module.exports = router;