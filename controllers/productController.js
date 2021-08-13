const {getProducts,setProducts,deleteProducts,updateProducts} = require("../services/products/products.js")
const url = require("url")
const {searchProduct} = require("../services/query/queryProducts.js")

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
        // there are to rewrite that section beacuse is not correctly working
        data = new searchProduct(req.params)
        console.log(req.params)
        /*
        try{
          let result = await getProducts(data.filter,data.projection, data.sort, data.limit,data.skip)
          res.json(result)
        }
        catch(e){
          console.log(e)
          res.json({
            error:e
          })
        }*/

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
