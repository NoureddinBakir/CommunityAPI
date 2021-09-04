const router = require('express').Router();
const User = require('../models/user');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const { reset } = require('nodemon');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res)=>{

    //Validation
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    //Duplicate verification
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) {return res.status(400).send('Email already exists')};

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Save user, complete registration
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try{
        const savedUser = await user.save();
        res.status(200).send(savedUser._id);
    }catch(err){
        res.status(400).json(err);
        console.log("not work mi sad boy");
    }
});

router.post('/login', async (req,res)=>{
     //Validation
     const {error} = loginValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message);

    //Duplicate verification
    const user = await User.findOne({email: req.body.email});
    if(!user) {return res.status(400).send('Email or Password incorrect')};

    //Password verfication
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Password or Email incorrect');

    //Create and assign a token
    const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    // res.send('Everything Works');
});



module.exports = router;