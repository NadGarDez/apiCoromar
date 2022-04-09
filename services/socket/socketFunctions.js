const { saveMessage } = require("../chat/chatFuncions");
const { userConnections } = require("../user/user")


const onInfoAction = async (type,socket, userId="", clients)=>{
    switch (type) {
        case "chat/writing":
            /*
            if (clientExist(userId,clients)) {
                socket.to(clients[item]).emit(type,{userId});
            }*/
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


const onMessageAction = async (content,socket, toUser ,group_member, clients, type)=>{
    // save on database
    const userId = socket.idUser;
    let result;
    try {
        result = await saveMessage(content,socket.idUser,toUser,group_member,type)
        
        if (clientExist(userId,clients)) { // send message to the client
            socket.emit("chat/sendMessageResponse",result)
        }

        if (result.status==='success' && clientExist(toUser,clients)) { // send message to the client
            console.log('sending to partner')
            socket.to(clients[toUser]).emit("chat/message",result)
        }
        
    } catch (error) {
        console.log(error)
    }

    //both
/*
    try {
        await bothSender(content,socket.idUser,toUser,group_member,type,clients,socket)
    } catch (error) {
        console.log(error);
    }
    */
}



const bothSender = async (content,toUser,fromUser,group_member,type,clients,socket)=>{
    try {
        result = await saveMessage(`you say : ${content}`,fromUser,toUser,group_member,type)

        if (result.status==='success' && clientExist(toUser,clients)) { // send message to the client
            socket.emit("chat/message",result)
        }
        
    } catch (error) {
        console.log(error)
    }
}





// utils

const clientExist = (id, clients)=>{
    const users = Object.keys(clients);
    return Boolean(users.find((item)=>item === id));
  };


module.exports =  {
    onInfoAction,
    onMessageAction,
    clientExist
}