const jwt = require('jsonwebtoken')
const {llave} = require("../config.js")

const auth = async (req,res,next)=>{
  
  const token = req.header("Authorization");
  if(token){
    jwt.verify(
      token.split(' ')[1],
      llave,
      (err,decoded)=>{
        if(err){
          res.json({mensaje:"Token invalida"})
        }
        else{
          req.decoded = decoded
          next()
        }
      }
    )

  }
  else{
    res.json({mensaje:"Token  no provista"})
  }

}

const authSocket = (token,next,socket)=>{
  const obj = {}
  jwt.verify(
    token,
    llave,
    (err,decoded)=>{
     // console.log(err,decoded, this)
      if(err){
       // obj =  {status:'error', message:'invalid token'}
        
        next(new Error('Auth Error'))
      }
      else{
       // obj = {status:'success', decoded}
       socket.idUser = decoded._id;
       next();
      }
    }
  )
  return obj;
}



module.exports={
  authMidd:auth,
  authSocket:authSocket
}
