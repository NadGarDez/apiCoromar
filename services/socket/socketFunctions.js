const { saveMessage } = require("../chat/chatFuncions");
const { userConnections } = require("../user/user")


const onInfoAction = async (type,socket, userId="", clients)=>{
    switch (type) {
        case "chat/writing":
            if (clientExist(userId,clients)) {
                socket.to(clients[item]).emit(type,{userId});
            }
            console.log('writing');
            break;

        case "chat/connect":
            const connections = await userConnections(socket.userId);
            if (Array.isArray(connections)) {
                connections.forEach(
                    (item)=>{
                        if (clientExist(item,clients)) {
                            socket.to(clients[item]).emit(type,{userId});
                        }
                    }
                )
            }

            break;
    
        default:
            break;
    }
    
}


const onMessageAction = async (content,socket, toUser ,group, clients, type)=>{
    // save on database
    let result;
    try {
        result = await saveMessage(content,socket.idUser,toUser,group,type)

        if (result.status==='success' && clientExist(receptorUserId,clients)) { // send message to the client
            socket.to(clients[item]).emit(type,{
                content,
                from,
                fromUser,
                toUser,
                type:'text'
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}





// utils

const clientExist = (id, clients)=>{
    const users = Object.keys(clients);
    return Boolean(users.find((item)=>item.idUser === id));
  };


module.exports =  {
    onInfoAction,
    onMessageAction,
    clientExist
}