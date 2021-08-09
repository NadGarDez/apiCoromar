const jwt = require('jsonwebtoken')
const {llave} = require("../config.js")

const auth = async (req,res,next)=>{
  const token = req.headers["access-token"]
  if(token){
    jwt.verify(
      token,
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
    console.log("aqui")
    res.json({mensaje:"Token  no provista"})
  }

}



module.exports={
  authMidd:auth
}
