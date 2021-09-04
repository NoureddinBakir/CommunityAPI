const Joi = require('@hapi/joi');

//Register Validation
const registerValidation =data=>{
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(true),
        email: Joi.string()
            .min(6)
            .required(true),
        password: Joi.string()
            .min(6)
            .required(true)
    });

    return schema.validate(data);
};

//Login Validation
const loginValidation =(data)=>{
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required(true),
        password: Joi.string()
            .min(6)
            .required(true)
    });

    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;