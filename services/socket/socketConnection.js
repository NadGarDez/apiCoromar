const { Server } = require("socket.io");
const { authSocket } = require("../../middlewares/authMiddleware");
const {socketEvents} = require("./socketEvents");

// this part was builded in past days

const ioConection = (server)=>{
 
  const io  = new Server(server, {cors: {
      origin: "http://localhost:3000"
    } }
  );


  io.use(
     (socket,next)=>{
      const result = authSocket(socket.handshake.auth.token.split(' ')[1],next,socket);
      
    }
  )

  
  return socketEvents(io);
}

module.exports = {
  ioConection:ioConection
}