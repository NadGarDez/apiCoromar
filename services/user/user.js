const res = require("express/lib/response");
const {connection} = require("../db/dbConnection.js")
const ObjectID = require('mongodb').ObjectID;
console.log(ObjectID);


const userExist = async (user,pass)=>{
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


// esto es un controlador no un servicio... cambiar a futuro

const createUser = async (req,res)=>{
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


const userInformation = async (id)=>{
  client = await connection();
  let result;
  try {
    result = await client.collection("users").find({_id:new ObjectID(id)}).project({avatar:1,user:1}).toArray();
    return result;
  } catch (error) {
    console.log(error, 'error seller information')
    return error;
  }
}

const usersInformation = async (arr)=>{
  client = await connection();
  const ids = arr.map((item)=>ObjectID(item));
  let result;
  try {
    result = await client.collection("users").find({_id:{$in:ids}}).project({avatar:1,user:1}).toArray();
    return result;
  } catch (error) {
    console.log(error, 'error seller information')
    return error;
  }
}

const userConnections = async (id)=>{
  const client = await connection();
  result;
  try {
    result = await client.collection("users").find({connections:{$elemMatch:{$eq:id}}}).project({connections:1}).toArray();
  } catch (error) {
    return error;
  }

  return result;
}

const createConnection = async (userId1, userId2)=>{
  const client = await connection();
  const count = await client.collection("users").find({connection:{$elemMatch:{$eq:userId2}}}).count();
  if (count === 0) {
    try {
      result = await client.collection("users").updateOne({_id:ObjectID(userId1)},{$addToSet:{connections:userId2}});
      console.log(result);
    } catch (error) {
      console.log(error);
      throw new Error(error.message)
    }
    try {
      result = await client.collection("users").updateOne({_id:ObjectID(userId2)},{$addToSet:{connections:userId1}});
      console.log(result);
    } catch (error) {
      console.log(error)
      throw new Error(error.message)
    }
  }
  
}

module.exports = {
  userExist:userExist,
  createUser:createUser,
  userConnections:userConnections,
  createConnection,
  usersInformation,
  userInformation
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
