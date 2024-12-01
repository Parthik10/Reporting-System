// given any zod schema , you can call its '.parse method to check 'data is valid/ if it is a value is returned with full type information otherwise an error is thrown

const validate = (Schema) => async(req,res,next) =>{
    try {
        const parseBody = await Schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status = 422;
        const message = "fill details properly"
        // const extraDetails = err.errors[0].message;

        const error = {
            status,
            message,
            // extraDetails,
        };
        console.log(message);
        // res.status(400).json({msg: message});
        next(error);
    }
}

module.exports=validate;