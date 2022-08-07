const {ObjectId} = require("mongodb")
class QueryProduct {


  constructor(params){
    this.params = params
    this.query = {}
    this.queryElements = ["filter","projection","sort","limit","skip"]
    this.addId = this.addId.bind(this)
    this.addOrder = this.addOrder.bind(this)
    this.addProject = this.addProject.bind(this)
    this.addLimit = this.addLimit.bind(this)
    this.addMatch = this.addMatch.bind(this)
    this.fillUndefined = this.fillUndefined.bind(this)

  }

  generateQuery(){
    if(typeof this.params.id === "undefined" || this.params.id == "undefined"){
      this.addOrder(this.params)
      this.addMatch(this.params)
    }
    else{
      this.addId()

    }
    this.addProject(this.params)
    this.addLimit(this.params)

    this.fillUndefined()

    return this.query

  }


  addId(params=this.params){

    if(typeof params.id==="undefined" || params.id=="undefined"){


      this.query.filter = {}
    }
    else if(typeof params.id !== "object" ){
      this.query.filter = {
        _id:new ObjectId(params.id)
      }

    }
    else{
      throw new TypeError("Data type unexpected, expected string and number")
    }
  }

  fillUndefined(){
    this.queryElements.forEach((item, i) => {
      this.query[item] = typeof this.query[item] === "undefined" ? null : this.query[item]
    });

  }
  addOrder(params=this.params){
    if(typeof params.typeOrder==="undefined" || params.typeOrder=="undefined"){
      this.query.sort = {price:1}
    }
    else{
      switch (params.typeOrder) {
        case "priceAsc":
          this.query.sort = {
              price:1
          }
        break;
        case "priceDesc":
            this.query.sort = {
              price:-1
            }
        break;
        case "datePublicationAsc":
          this.query.sort = {
            datePublication:1
          }
        break;
        case "datePublicationDesc":
          this.query.sort = {
            datePublication:-1
          }
        break;

        default:
          throw new Error("Wrong option, expected 'priceAsc,priceDesc,datePublicationAsc datePublicationDesc'")
        break

      }
    }
  }

  addProject(params=this.params){
    switch (params.typeProjection) {
      case "preview":
        this.query.projection = {
          idUser:1,
          _id:1,
          title:1,
          price:1,
          seller:1,
          description:1,
          image:1,
        }
      break;

      case "publication":
        this.query.projection = {
          idUser:1,
          _id:1,
          title:1,
          price:1,
          seller:1,
          image:1,
          stock:1,
          description:1,
          calificacion:1,
        }

      break
      default:
        throw new Error("Wrong option, expected 'publication, preview'")
      break;

    }



  }

  addLimit(params=this.params){

    this.query.limit = 20

    if(params.limitStart < 0 || typeof params.limitStart === "string" || typeof params.limitStart === "object"  ){
      throw new RangeError("The limitStart argument must be a number and greater or equal than cero")
    }
    else {
      if(typeof params.limitStart === "undefined" || params.limitStart == "undefined"){
        this.query.skip=0
      }
      else if (params.limitStart >= 0 ) {

        this.query.skip = params.limitStart

      }
    }

  }

  addMatch(params=this.params){

    switch (params.matchType) {
      case "general":
        this.query.filter = {
          $text:{$search:params.matchValue}
        }
      break;
      case "specify":

        this.query.filter[params.matchKey] = params.matchValue

      break;

      case "noMatch":

      break

      default:
        throw new Error("Wrong option. Expected 'general, specify, noMatch'")
      break

    }
  }




}


module.exports = {
  searchProduct:QueryProduct,
}
