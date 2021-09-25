const router = require('express').Router();
const Contacts = require('../models/contacts');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const { reset } = require('nodemon');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res)=>{

    //Validation
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    //Duplicate verification
    const emailExist = await Contacts.findOne({email: req.body.email});
    if(emailExist) {return res.status(400).send('Email already exists')};

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Save contact, complete registration
    const contact = new Contacts({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try{
        const savedContacts = await contact.save();
        res.status(200).send("Success");
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
    const contact = await Contacts.findOne({email: req.body.email});
    if(!contact) {return res.status(400).send('Email or Password incorrect')};

    //Password verfication
    const validPass = await bcrypt.compare(req.body.password, contact.password);
    if(!validPass) return res.status(400).send('Password or Email incorrect');

    //Create and assign a token
    const token = jwt.sign({_id: contact.id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    // res.send('Everything Works');
});



module.exports = router;