const jwt = require('jsonwebtoken');


const ValidateToken = (req,res,next) => {

    const authToken = req.headers.authorization || req.headers.Authorization;
    let token ;
    if(authToken && authToken.startsWith("Bearer")){
        console.log('ife girdi');
        token = authToken.split(" ")[1];
        console.log(token);
        jwt.verify(token,process.env.ACCESSTOKEN_SECRETKEY,(err,decoded )=>{
            if(err){
                res.status(401);
                throw new Error('Un-Authorized - Invalid Token!')
            }
            console.log('decoded = ',decoded);
            req.username = decoded?.user?.username;
            req.accesstoken = token;
            req.user_id = decoded?.user?.id;
            
            
        next()
        })
        // if(!token){
        //     res.status(401);
        //     throw new Error('Un-Authorized - Token is missing!')

        // // }
        // next()

    }else{
        console.log('ife girmedi');
        res.status(401);
        throw new Error('Un-Authroized - Token is missing!')
        
    }
}


module.exports = ValidateToken;