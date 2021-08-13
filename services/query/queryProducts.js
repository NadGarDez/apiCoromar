class QueryProduct {


  constructor(params){
    this.params = params
    this.query = {}
    this.addId = this.addId.bind(this)
    this.addOrder = this.addOrder.bind(this)
    this.addProject = this.addProject.bind(this)
    this.addLimit = this.addLimit.bind(this)
    this.addMatch = this.addMatch.bind(this)



  }

  generateQuery(){
    if(this.addId(this.params) == true){
      return this.query
    }
    else{
      this.addOrder(this.params)
      this.addProject(this.params)
      this.addLimit(this.params)
      this.addMatch(this.paramas)
      return this.query
    }
  }

  addId(params=this.params){

    if(typeof params.id==="undefined"){


      this.query.filter = {}
    }
    else{
      this.query.filter = {
        _id:params.id
      }

    }
  }
  addOrder(params=this.params){
    if(typeof params.typeOrder==="undefined"){
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

      }
    }
  }

  addProject(params=this.params){

    if(params.typeProjection == "preview"){
      this.query.project = {
        idUser:1,
        _id:1,
        title:1,
        price:1,
        seller:1,
        image:1,
      }
    }
    else{
      this.query.project = {
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
    }

  }

  addLimit(params=this.params){

    this.query.limit = 20

    if(params.limitStart < 0 || typeof params.limitStart === "string" || typeof params.limitStart === "object"  ){
      throw new RangeError("The limitStart argument must be a number and greater or equal than cero")
    }
    else {
      if(typeof params.limitStart === "undefined"){
        this.query.skip=null
      }
      else if (params.limitStart >= 0 ) {

        this.query.skip = params.limitStart

      }
    }

  }

  addMatch(params=this.params){
    if(typeof this.query.filter._id === "undefined"){
      switch (params.matchType) {
        case "general":
          this.query.filter = {
            $text:{$search:params.matchValue}
          }
        break;
        case "specify":

          this.query.filter[params.matchKey] = params.matchValue

        break;

      }
    }


  }

}


module.exports = {
  searchProduct:QueryProduct,
}
