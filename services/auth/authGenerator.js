
const {userExist} = require("../user/user.js")
const jwt = require('jsonwebtoken')
const {llave} = require("../../config.js")

const auth = async (req,res)=>{

  const {user,pass} = req.body
  console.log(user,pass)
  let result = await userExist(user,pass)
  console.log(result)
  if(result){
    let payload = {
      check:true
    }
    let expiration = {
      expiresIn:1440
    }
    let token = jwt.sign(payload,llave,expiration)
    res.json(
      {
        mensaje:"autenticado",
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
