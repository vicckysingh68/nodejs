var jwt = require('jsonwebtoken');
 
const jwtAuthMiddleawre= (req, res, next)=>{

// first check request headers has authorization  or not

const authorization= req.headers.authorization;
if(!authorization) return res.status(401).json({error: 'token Not found'})

    // Extract the JWT token from the request  header

    const token = req.headers.authorization.split(' ')[1]; 
    console.log('token', token);
   if(!token) return res.status(401).json({error: 'Unauthorized'});
   try{
    // verify the JWT token 
      const decoded=  jwt.verify(token, process.env.JWT_SECRET);
       // Attach user information to the request object
      req.user = decoded;
      next();

   } catch(err){

    console.log(err);
    res.status(401).json({ error: 'invalid token '})

   } 
}

// Function to generate JWT Token
const generateToken= (userData)=>{
    // Generate a new JWT token Using user data
    console.log(typeof userData); // This should log "object"
    if (typeof userData === 'string') {
        userData = { data: userData }; // Wrap string in an object
    }

    // Ensure JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables.');
    }

    return jwt.sign(userData,process.env.JWT_SECRET, {expiresIn: "30s"});
}

module.exports={jwtAuthMiddleawre, generateToken};