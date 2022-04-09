const {connection} = require("../db/dbConnection.js");
const ObjectID = require('mongodb').ObjectID;

const saveMessage = async (content,fromUser,toUser,group_member,type)=>{
    const client = await connection();
    let result;

    try {

        result = await client.collection("chat").insertOne({
            content,
            fromUser,
            toUser,
            group_member,
            status:1,
            type
        })

        if (result.insertedCount === 1) {
            return {status:'success',data:{...result.ops[0], create_at:ObjectID(result.insertedId).getTimestamp().toISOString()}}
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

const getMessages = async (userId, idLimit=null)=>{
    const client = await connection();
    let result;
    const query = idLimit === null ? {
            $or:[{toUser:userId},{fromUser:userId}]   
        } : {
            $and:[
                {$or:[{toUser:userId},{fromUser:userId}]},
                {_id:{$gt:ObjectID(idLimit)}}
            ]
        }
    

    try {
        result = await client.collection("chat").find(query).toArray()

        /*
        const fromFilter = result.reduce(
            (groups, item)=>{
                const {fromUser,toUser} = item;
                const key = fromUser === userId ? toUser : fromUser;
                console.log(groups,key);
                groups[key] = !Array.isArray(groups[key]) ? [] : groups[key];
                console.log(groups[key])
                groups[key].push(item);
                return groups 
            },
            {}
            
        )
        */

        const schemaAltered = result.map(
            item => {
                const create_at = ObjectID(item._id).getTimestamp().toISOString();
                return {...item, create_at};
            }

        )

        

        return schemaAltered;
        
    } catch (error) {
        return error
    }

}




module.exports = {
    saveMessage,
    getMessages
}


/* 

fun = (group,item)=>{
    const {a,b} = item;
    if(a == 'sopa'){
        console.log(group[b])
        group[b] = group[b] ?? []
        group[b].push(item); 
    }
    else {
        group[a] = group[a] ?? []
        group[a].push(item)
    }
    return group;
}


*/