const Joi = require('joi');

// validating registration 
const registerValidation = (data) => {
    const schema = Joi.object(
        {
            name: Joi.string().min(6).max(50).required(),
           email: Joi.string().min(8).max(50).required(),
            password: Joi.string().min(8).max(200).required()
        });
    return schema.validate(data);
}

// validating login

// logic to verify the our token 

module.exports = {registerValidation};