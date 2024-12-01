const {z} = require("zod")


//creating an object schema
const signupSchema = z.object({
    username : z
    .string({required_error: "Name is reuired"})
    .trim()
    .min(3,{message: " Name is must be at lest of 3 chars ."})
    .max(255,{message : "name must not be more than 255 characters"}),
    email : z
    .string({required_error: "email is reuired"})
    .trim()
    .email({message: " invalid email address ."})
    .min(3,{message: " email is must be at lest of 3 chars ."})
    .max(255,{message : "email must not be more than 255 characters"}),
    password : z
    .string({required_error: "password is reuired"})
    .trim()
    .min(7,{message: " password is must be at lest of 7 chars ."})
    .max(255,{message : "password must not be more than 255 characters"}),

});

module.exports = signupSchema;