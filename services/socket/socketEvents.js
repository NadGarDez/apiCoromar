const { createConnection } = require("../user/user");
const { clientExist, onInfoAction, onMessageAction } = require("./socketFunctions");

const socketEvents = (io)=>{

    let clients = {};

    
    io.on('connect', (socket) => {

        const socketId =socket.id
        clients = clients[socket.idUser] !== socketId ? {...clients, [socket.idUser]:socket.id} : clients;
        socket.to(clients[socket.idUser]).emit("other", "hey")
        socket.on("test_message",
          (mss)=>{
            socket.emit("test_message",mss);
          }
        )
        socket.on(
          "disconnect",
          ()=>{
            delete clients[socket.idUser]
          }
        )

        socket.on(
            "chat/create_connection",
            async (sellerId)=>{
                // insert id in both user's connection array
                await createConnection(socket.idUser, sellerId);

            }
        )

        socket.on(
            "chat/writing",
            async (userId)=>{
                // send event writing to user connection
                await onInfoAction("chat/writing",socket, userId, clients)
            }
        )

        socket.on(
            "chat/message",
            async (content, toUser , group_member,type)=>{
                // send message to user
               await onMessageAction(content,socket,toUser ,group_member, clients, type)
              
            }
        )
        
      });

    
      
      io.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
    
    
    return io;
}

module.exports = {
    socketEvents:socketEvents
}