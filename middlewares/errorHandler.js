module.exports = function (err,req,res,next) {

        const statusCode = res.statusCode || 500;
        res.status(statusCode).json({
            error:true,
            message:err.message,
            stack:err.stack,
        })
}