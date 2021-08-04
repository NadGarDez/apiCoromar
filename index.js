const express = require("express")
const {llave} = require("./config.js")
const parser = require("body-parser")
const {auth} = require("./services/auth/authGenerator.js")
const {authMidd} = require("./middlewares/authMiddleware.js")
const {createUser} = require("./services/user/user.js")

let app = express()
app.set("llave",llave)
app.use(parser.urlencoded({extended:true}))
app.use(parser.json())

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
  "/",
  (req,res)=>{
      res.send("hola mundo")
  }
)


app.listen(
  8080,
  ()=>{
    console.log("iniciado el servidor")
  }
)
