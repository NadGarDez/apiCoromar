const {connection} = require("../db/dbConnection.js")
const {Readable,Writable,Duplex,Transform} = require("stream")

const getProducts = async (filter={},projection=null, sort=null, limit=null,skip= null) => {
  let result = ""
  const client = await connection()
  try{

    let cursor =   client.collection("products").find(filter).project(projection).sort(sort).limit(limit).skip(skip)
    result = await cursor.toArray();
  }
  catch(e){
    console.log(e)
    result = e
  }

  return result

}




const setProducts = async (data) => {

  const {many,fields} = data
  const client = await connection()
  let result = ""

  if (many==true) {
    result = await client.db("limpiezaCoromar").collection("products").insertMany(fields)
  }
  else {
    result = await client.db("limpiezaCoromar").collection("products").insertOne(fields)
  }

  return result

}

const deleteProducts = async (req,res) => {

  const {many,fields} = data
  const client = await connection()
  let result = ""

  if (many==true) {
    result = await client.db("limpiezaCoromar").collection("products").deleteMany(fields)
  }
  else {
    result = await client.db("limpiezaCoromar").collection("products").deleteOne(fields)
  }

  return result

}

const updateProducts = async (req,res) => {
  const {many,filter,fields} = data
  const client =await  connection()
  let result = ""

  if (many==true) {
    result = await client.db("limpiezaCoromar").collection("products").updateMany(filter,fields)
  }
  else {
    result = await client.db("limpiezaCoromar").collection("products").deleteOne(filter,fields)
  }

  return result
}

module.exports = {
  getProducts:getProducts,
  setProducts:setProducts,
  deleteProducts:deleteProducts,
  updateProducts:updateProducts
}
