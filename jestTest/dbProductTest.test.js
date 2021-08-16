const fetch = require("node-fetch")

const getFilters = [ //here we should put the the filter that we will use to all the product request in the app
  {
    typeOrder:"datePublicationDesc",
    typeProjection:"preview",
    matchType:"noMatch",
    limitStart:0
  },
  {
    id:1,
    typeOrder:"priceDesc",
    typeProjection:"preview",
    matchType:"noMatch",
    limitStart:0
  },
  {
    typeOrder:"datePublicationDesc",
    typeProjection:"preview",
    matchType:"general",
    matchKey:"title",
    matchValue:"Cera",
    limitStart:0
  },
  {
    typeOrder:"datePublicationDesc",
    typeProjection:"publication",
    matchType:"general",
    matchKey:"title",
    matchValue:"lorem",
    limitStart:2
  }


]

const url ={
  local : "http://localhost:8080",
  remote : ""
}



describe(
  "Database query",
  ()=>{
    getFilters.forEach((item, i) => {

      test(
        "Data length test",
        ()=>{
          return fetch(`http://localhost:8080/p/${item.id}/${item.typeProjection}/${item.typeOrder}/${item.limitStart}/${item.matchType}/${item.matchKey}/${item.matchValue}`)
          .then(
            data => data.json()
          )
          .then(
            data =>{
              console.log(data)
              expect(data.length).toBeGreaterThanOrEqual(0)
            }
          )
          .catch(
            err => console.log(err)
          )
        }
      )

      test(
        "Match test",
        ()=>{
          if(item.matchType != "noMatch" ){
            return fetch(`http://localhost:8080/p/${item.id}/${item.typeProjection}/${item.typeOrder}/${item.limitStart}/${item.matchType}/${item.matchKey}/${item.matchValue}`)
            .then(
              data => data.json()
            )
            .then(
              data =>{
                console.log(data)
                const expected = [
                  expect.stringMatching(item.matchValue),
                ];
                expect(JSON.stringify(data)).toEqual(
                  expect.arrayContaining(expected)
                )
              }
            )
            .catch(
              err => console.log(err)
            )
          }
        }
      )





    });


  }
)
