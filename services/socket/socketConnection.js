const { Server } = require("socket.io");
const { authSocket } = require("../../middlewares/authMiddleware");

const ioConection = (server)=>{
  let clients = {};
  const clientExist = (id)=>{
    const users = Object.keys(clients);
    return Boolean(users.find((item)=>item.idUser === id));
  };

  const io  = new Server(server, {cors: {
      origin: "http://127.0.0.1"
    } }
  );


  io.use(
     (socket,next)=>{
      const result = authSocket(socket.handshake.auth.token.split(' ')[1],next,socket);
      
    }
  )

 
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on(
      "message",
      (text)=>{
        console.log("mensaje :", text);
      }
    )
  });
  
  io.on('connect', (socket) => {
    console.log(socket.idUser);
    if (!clientExist(socket.idUser)) {
      const copy = {...clients};
      copy[socket.idUser] = socket.id;
      clients = copy;
    }
    socket.on("message",
      (mss)=>{
        console.log(clients);
        socket.emit("message",mss);
      }
    )
  });
  
  io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  return io;
}

module.exports = {
  ioConection:ioConection
}