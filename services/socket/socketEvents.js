const { createConnection } = require("../user/user");
const { clientExist, onInfoAction, onMessageAction } = require("./socketFunctions");

const socketEvents = (io)=>{

    let clients = {};

    
    io.on('connect', (socket) => {

      
        if (!clientExist(socket.idUser,clients)) {
          const copy = {...clients};
          copy[socket.idUser] = socket.id;
          clients = copy;
        }

        socket.on("test_message",
          (mss)=>{
            socket.emit("test_message",mss);
          }
        )

        socket.on(
            "chat/create_connection",
            async (sellerId)=>{
                // insert id in both user's connection array
                console.log('creando coneccion');
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
            async (content, toUser , type)=>{
                // send message to user
                await onMessageAction(content,socket,toUser , clients, type)
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