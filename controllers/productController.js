const {getProducts,setProducts,deleteProducts,updateProducts} = require("../services/products/products.js")
const url = require("url")


const controller = async (req,res)=>{
    let data = ""
    let result = ""
    console.log(url.parse(req.url,true).query)

    switch (req.method) {
      case "POST":
        data = req.body.data
        result = await setProducts(data)
        res.json(result)
      break;
      case "GET":
        data = url.parse(req.url,true).query

        try{
          let result = await getProducts(JSON.parse(data.query))
          res.json(result)
        }
        catch(e){
          console.log(e)
          res.json({
            error:e
          })
        }

      break;

      case "PUT":
        result = await updateProducts(data)
        res.json(result)

      break;

      case "DELETE":
        result = await deleteProducts(data)
        res.json()
      break

    }



}

module.exports.productController = controller
