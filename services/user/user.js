const {connection} = require("../db/dbConnection.js")


let userExist = async (user,pass)=>{
  client = await connection()
  try{
    result = await client.collection("users").find({user:user,pass:pass}).project({ user:1 }).toArray();
    console.log(result);
    if(result.length > 0){
      return result
    }
    else{
      return []
    }
  }
  catch(e){
    console.log(e)
  }


}

let createUser = async (req,res)=>{
  const {user,email,pass} = req.body
  console.log(req.body)
  client = await connection()
  try{
    result = await client.collection("users").find({email:email}).count()
    if(result < 1){
      let result = await client.collection("users").insertOne({user:user,email:email,pass:pass})
      if(result.insertedCount==1){
        res.json(
          {
            mensaje:"usuario creado"
          }
        )
      }
      else{
        res.json({
          error:"error al insertar el usuario"
        })
      }
    }
    else{
      res.json({
        error:"El correo electronico ya esta previamente relacionado a otra cuenta"
      })
    }
  //  let result = await.db("limpiezaCoromar").collection("users").insertOne({user})
  }
  catch(err){
    return err
  }


}

module.exports = {
  userExist:userExist,
  createUser:createUser
}



/*

var url = 'https://localhost:8080/auth';
var data = {user: 'iranad',pass:"123"};

fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));

*/
