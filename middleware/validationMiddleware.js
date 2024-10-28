const { check, validationResult } = require('express');

const validateSignup = [
    check('name', 'Name is required').not().isEmpty(),
    check('email','Email is required').isEmail(),
    check('password','Password should be at least 6 characters long').isLength({min:6}),(req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

module.exports = {validateSignup};