const {MongoClient} = require("mongodb")
require('dotenv').config()
let mongo1 = async ()=>{
  let uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try{
    await client.connect()
    await client.db("defaultBackendDb").command({ping:1})
    return client.db("defaultBackendDb")
  }
  catch(err){
    console.log(err)
  }

}

module.exports.connection = mongo1
