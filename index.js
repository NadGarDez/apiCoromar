const express = require("express")
const http = require('http');
const cors = require('cors')
const {llave} = require("./config.js");
const parser = require("body-parser");
const {auth} = require("./services/auth/authGenerator.js");
const {authMidd} = require("./middlewares/authMiddleware.js");
const {createUser} = require("./services/user/user.js");
const {productController} = require("./controllers/productController.js");
const {ioConection} = require("./services/socket/socketConnection");
const { partnerInformationController, partnersInformationController } = require("./controllers/parterController.js");
const { messageController } = require("./controllers/messageController.js");

let app = express()
const server = http.createServer(app);

ioConection(server);

app.set("llave",llave)
app.use(parser.urlencoded({extended:true}))
app.use(parser.json())
app.use(cors())



app.get(
  "/",
  (req,res)=>{
      res.send("hola mundo")
  }
)


app.post(
  "/auth",
  auth
)

app.post(
  "/createUser",
  createUser
)

app.use(
  authMidd
)

app.post(
  "/getMessages",
  messageController
)

app.get(
  "/partnerInformation/:partnerId",
  partnerInformationController
)

app.post(
  "/partersInformation",
  partnersInformationController
)

app.get(
  "/p/:id/:typeProjection/:typeOrder/:limitStart/:matchType/:matchKey/:matchValue",
  productController
)


const listener = server.listen(
  80,
  ()=>{
    console.log("iniciado el servidor", listener.address())
  }
)
