const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode === 200? 500 : res.statusCode;

    res.status(statusCode).json({
        message : err.message,
        stack : process.env.Node_ENV === 'production'? null : err.stack,
    });

}

module.exports = errorHandler;