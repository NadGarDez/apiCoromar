const { getMessages } = require("../services/chat/chatFuncions")

const messageController = async (req, res)=>{
    const {limitId} = req.body;
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