const express = require('express');
const router = express.Router();
const Communities = require('../models/community');
const Notifications = require('../models/notifications');
const Events = require('../models/events');
const Groups = require('../models/groups');
const CustomGroups = require('../models/customGroups');
const Contacts = require('../models/contacts');
const verify = require('./verifyToken');

//Get back notifications from latest to oldest
router.get('/notifications', verify,  async (req, res) => {
    try {
        const notifications = await Notifications.find().sort({_id:-1});
        res.json(notifications);
    } catch (err) {
        res.json({message: err});  
    }
})
//Post a notifications notification
router.post('/notifications', verify, async (req, res) => {
    const notification = new Notifications({
        created: req.body.created,
        start: req.body.start,
        end: req.body.end,
        active: req.body.active,
        info: {
            title: req.body.info.title,
            subTitle: req.body.info.subTitle,
            image:req.body.info.image
        },
        recipientGroup: req.body.recipientGroup
    });

    try{
        const savedNotifcation = await notification.save();
        res.status(201).json(savedNotifcation);
    }catch(err){
        res.status(400).json({message: err});
        console.log("Error 404, check DB connection");
    }
});


//Get latest events
router.get('/events', verify,  async (req, res) => {
    try {
        const events = await Events.find().sort({_id:-1});
        res.json(events);
    } catch (err) {
        res.json({message: err});  
    }
})
//Post a events notification
router.post('/events', verify, async (req, res) => {
    const event = new Events({
        created: req.body.created,
        start: req.body.start,
        end: req.body.end,
        active: req.body.active,
        info: {
            title: req.body.info.title,
            subTitle: req.body.info.subTitle,
            image:req.body.info.image
        },
        attendees: req.body.attendees
    });

    try{
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
    }catch(err){
        res.status(400).json({message: err});
        console.log("Error 404, check DB connection");
    }
});


//Get latest group
router.get('/groups', verify,  async (req, res) => {
    try {
        const groups = await Group.find(req.body.groupId);
        res.json(groups);
    } catch (err) {
        res.json({message: err});  
    }
})
// Post a events group !! we need a modify function
router.post('/groups', verify, async (req, res) => {
    const groups = new Groups({
        communityId: req.body.communityId,
        groupName: req.body.groupName,
        groupInfo: {
            created: req.body.groupInfo.created,
            description: req.body.groupInfo.description
        },
        post: req.body.post
    });

    try{
    const savedGroups = await groups.save();
    res.status(201).json(savedGroups);
    }catch(err){
        res.status(400).json({message: err});
        console.log("Error 404, check DB connection");
    }
});


//Get latest customGroups by _id
router.get('/customGroups', verify,  async (req, res) => {
    try {
        const customGroups = await CustomGroups.find(req.body.groupId);
        res.json(customGroups);
    } catch (err) {
        res.json({message: err});  
    }
})
// Post a events customGroups !! we need a modify function
router.post('/customGroups', verify, async (req, res) => {
    const customGroups = new CustomGroups({
        communityId: req.body.communityId,
        groupName: req.body.groupName,
        groupInfo: {
            created: req.body.groupInfo.created,
            description: req.body.groupInfo.description
        },
        post: req.body.post
    });

    try{
    const savedCustomGroups = await customGroups.save();
    res.status(201).json(savedCustomGroups);
    }catch(err){
        res.status(400).json({message: err});
        console.log("Error 404, check DB connection");
    }
});


//Get community by communityName
router.get('/community', verify,  async (req, res) => {
    try {
        const community = await Communities.find(req.body.groupName);
        res.json(community);
    } catch (err) {
        res.json({message: err});  
    }
})
// Post a events community !! we need a modify function
router.post('/community', verify, async (req, res) => {
    const community = new Communities({
        communityName: req.body.communityName,
        info: {
            created: req.body.info.created,
            location: req.body.info.location,
            description: req.body.info.description
        },
        admins: req.body.admins
    });

    try{
    const savedCommunity = await community.save();
    res.status(201).json(savedCommunity);
    }catch(err){
        res.status(400).json({message: err});
        console.log("Error 404, check DB connection");
    }
});

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