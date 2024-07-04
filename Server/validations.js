const joi = require('@hapi/joi')
const { joiPasswordExtendCore } = require('joi-password');
const Joi = require('@hapi/joi')
const joiPassword = joi.extend(joiPasswordExtendCore);
const joiphone = Joi.extend(require('joi-phone-number'));

const registerSchema = joi.object({
    full_name: joi.string().min(6).required(),
    email: joi.string().min(6).required().email(),
    password: joiPassword
        .string()
        .min(8)
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .required(),
    phone: joiphone.string().phoneNumber(),
    admin: joi.any()
})

const loginSchema = joi.object({
    email: joi.string().min(6).required().email(),
    password: joiPassword
        .string()
        .min(8)
        .noWhiteSpaces()
        .required()
})

module.exports.registerSchema = registerSchema
module.exports.loginSchema = loginSchema
