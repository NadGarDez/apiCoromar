
const {userExist} = require("../user/user.js")
const jwt = require('jsonwebtoken')
const {llave} = require("../../config.js")

const auth = async (req,res)=>{

  const {user,pass} = req.body
  let result = await userExist(user,pass)
  if(result.length > 0){
    const payload = result[0];
    const expiration = {
      expiresIn:1440
    }
    let token = jwt.sign(payload,llave,expiration)
    res.json(
      {
        mensaje:"autenticado",
        _id:result[0]._id,
        token:token
      }
    )
  }
  else{
    res.json(
      {
        error:"autenticacion fallida"
      }
    )
  }
}


module.exports.auth = auth
