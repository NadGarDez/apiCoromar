const {connection} = require("../db/dbConnection.js");

const saveMessage = async (content,fromUser,toUser,type)=>{
    const client = await connection();
    let result;

    try {

        result = await client.collection("chat").insertOne({
            content,
            fromUser,
            toUser,
            status:1,
            type
        })

        if (result.insertedCount === 1) {
            return {status:'succes'}
        }
        else{
            return {status:'error'}
        }
        
    } catch (error) {
        return {
            status:'error',
            error
        }
    }

    
}



module.exports = {
    saveMessage,
}