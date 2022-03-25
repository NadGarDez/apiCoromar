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
const { sellerInformationController } = require("./controllers/sellerInformationController.js");

let app = express()
const server = http.createServer(app);

ioConection(server);


app.set("llave",llave)
app.use(parser.urlencoded({extended:true}))
app.use(parser.json())
app.use(cors())



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

app.get(
  "/sellerInformation/:sellerId",
  sellerInformationController
)

app.get(
  "/p/:id/:typeProjection/:typeOrder/:limitStart/:matchType/:matchKey/:matchValue",
  productController
)

app.get(
  "/",
  (req,res)=>{
      res.send("hola mundo")
  }
)



server.listen(
  7070,
  ()=>{
    console.log("iniciado el servidor")
  }
)
