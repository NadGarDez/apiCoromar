const { getMessages } = require("../services/chat/chatFuncions")

const messageController = async (req, res)=>{
    console.log(req.decoded._id)
    const {limitId} = req.body;
    console.log(limitId);
    let messages;
    try {
       messages = await getMessages(req.decoded._id,limitId);
       res.json(
           {
               status:'success',
               data:messages
           }
       )
    } catch (error) {
        console.log(error)
       res.json(
           {
               status:'error',
               error
           }
       )
    }
}


module.exports={
    messageController
}