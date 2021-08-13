const {MongoClient} = require("mongodb")

let mongo1 = async ()=>{
  let uri = "mongodb://localhost:27017/limpiezaCoromar"
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try{
    await client.connect()
    await client.db("limpiezaCoromar").command({ping:1})
    console.log("conectado")
    return client.db("limpiezaCoromar")
  }
  catch(err){
    console.log(err)
  }

}

module.exports.connection = mongo1
