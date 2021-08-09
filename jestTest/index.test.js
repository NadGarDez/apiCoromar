const fetch = require("node-fetch")

const getFilters = [ //here we should put the the filter that we will use to all the product request in the app
  /*{unique:false,filter:{}},
  {unique:false,filter:{price:"$20"}},
  {unique:false,filter:{nombre:"Hola Mundo"}},*/
  {projection:{_id:1},filter:null},

]

const url ={
  local : "http://localhost:8080",
  remote : ""
}


getFilters.forEach((item, i) => {
      let query = ""

      if (Object.entries(item).length > 0) {
        query = Object.keys(item).map(key => `${key}=${item[key]}`).join("&")
      }
      test(
        `GetProduct test -> Params : ${JSON.stringify(item)}`,
        ()=>{
          expect.assertions(1);
          return fetch(`${url.local}/p?query=${JSON.stringify(item)}`)
          .then(
            data => data.json()
          )
          .then(
            data => {
              console.log(data)
              expect(JSON.stringify(data)).not.toMatch("error")
            }
          )
          .catch(
            e => console.log(e)
          )


});
