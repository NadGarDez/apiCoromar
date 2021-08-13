const fetch = require("node-fetch")

const {searchProduct} = require("../services/query/queryProducts.js")

const getFilters = [ //here we should put the the filter that we will use to all the product request in the app
  {
    typeOrder:"priceAsc",
    typeProjection:"preview",
    matchType:"noMatch",
    limitStart:5
  },
  {
    id:1,
    typeOrder:"priceDesc",
    typeProjection:"preview",
    matchType:"noMatch",
    limitStart:-1
  },
  {
    id:1,
    typeOrder:"datePublicationAsc",
    typeProjection:"publication",
    matchType:"general",
    matchValue:"HOLA",
    limitStart:"1"
  },
  {
    id:1,
    typeOrder:"datePublicationDesc",
    typeProjection:"publication",
    matchType:"noMatch",
    limitStart:{}
  },
  {
    id:1,
    typeProjection:"preview",
    matchType:"noMatch",
  },

]

const url ={
  local : "http://localhost:8080",
  remote : ""
}

describe(
  "Single function query test",
  ()=>{
    getFilters.forEach((item, i) => {
      let query = new searchProduct(item)
      query.addId()
      query.addOrder()
      query.addProject()
      query.addMatch()
      test(
        `addId function test // id = ${item.id}, index = ${i}`,
        ()=>{
          if (typeof item.id === "undefined") {

            expect(query.query.filter).toMatchObject({})

          }
          else {

            expect(JSON.stringify(query.query.filter)).toMatch("_id")

          }

        }
      )


      test(
        `addOrder function test // typerOrder = ${item.typeOrder}, index = ${i}`,
        ()=>{
          if (typeof item.typeOrder === "undefined") {
            expect(query.query.sort).toMatchObject({price:1})
          }
          else {

            switch (item.typeOrder) {
              case "priceAsc":
                expect(query.query.sort).toMatchObject({price:1})
              break;
              case "priceDesc":
                expect(query.query.sort).toMatchObject({price:-1})
              break;
              case "datePublicationAsc":
                expect(query.query.sort).toMatchObject({datePublication:1})
              break;
              case "datePublicationDesc":
                expect(query.query.sort).toMatchObject({datePublication:-1})
              break;

            }

          }

        }
      )

      test(
        `addProject function test // typeProjection = ${item.typeProjection}, index = ${i}`,
        ()=>{
          if (item.typeProjection == "preview") {
            expect(query.query.project).toMatchObject(
              {
                idUser:1,
                _id:1,
                title:1,
                price:1,
                seller:1,
                image:1,
              }
            )
          }
          else {
            expect(query.query.project).toMatchObject(
              {
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
            )
          }
        }
      )

      test(
        `addLimit function test // limitStart = ${item.limitStart} , index = ${i}`,
        ()=>{
          if(item.limitStart < 0 || typeof item.limitStart === "string" || typeof item.limitStart === "object"){
            expect(()=>query.addLimit()).toThrow(RangeError)
          }
          else {
            query.addLimit()
            if (typeof item.limitStart === "undefined") {
              expect(query.query.skip).toBeNull()
            }
            else {
              expect(query.query.skip).not.toBeLessThan(0)
            }
          }
        }
      )

      test(
        `addMatch function test // matchValue = ${item.matchValue}, index = ${i}`,
        ()=>{
          if (typeof query.query.filter._id === "undefined") {
            switch (item.matchType) {
              case "general":
                expect(JSON.stringify(query.query.filter)).toMatch(`$text:{$search:${item.matchValue}}`)
              break;
              case "specify":
                expect(JSON.stringify(query.query.filter)).toMatch(`${item.matchKey}:${item.matchValue}}`)

              break;

            }
          }
          else {
            expect(true).toBe(true)
          }
        }
      )


    });

  }
)
/*
getFilters.forEach((item, i) => {
      let query = ""

      test(
        `GetProduct test -> Params : ${JSON.stringify(item)}`,
        ()=>{
          query = `${url.local}/p/${item.id}/${item.typeProjection}/${item.typeOrder}/${item.limitStart}/${item.matchType}/${item.matchKey}/${item.matchValue}`
          console.log(query)
          expect(1).toBe(1)
        

        });
})*/
