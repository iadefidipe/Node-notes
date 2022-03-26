const http = require("http") //module to create server
const url = require("url") // module to catch route
const fs = require("fs")

const replaceTemplate= require('./modules/replaceTemplate')


//? Reading the html files in
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, "utf-8")
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8")
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, "utf-8")


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
const dataObj = JSON.parse(data)

// const replaceTemplate = ( temp, product ) => {
//   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//   output = output.replace(/{%IMAGE%}/g, product.image);
//   output = output.replace(/{%PRICE%}/g, product.price);
//   output = output.replace(/{%FROM%}/g, product.from);
//   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//   output = output.replace(/{%QUANTITY%}/g, product.quantity);
//   output = output.replace(/{%DESCRIPTION%}/g, product.description);
//   output = output.replace(/{%ID%}/g, product.id); 

//   if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
//   return output
// }


//Todo: Creating a simple server
const server = http.createServer((req, res) => {
  console.log(req.url)
  //* Implementing basic ROUTING
  // const pathname = req.url

  //* rendering based in query and pathname
  const {query, pathname} = url.parse(req.url, true)

  //OVERVIEW
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" })

    const cardHtml = dataObj.map( el => replaceTemplate (tempCard,el) ).join('')
    const output = tempOverview.replace( '{%PRODUCT_CARDS%}', cardHtml )

    console.log(cardHtml)
    res.end(output)
  } else if (pathname === "/product") {
    //Product page]
    res.writeHead(200, { "Content-type": "text/html" })
    const product = dataObj[query.id]
    const output = replaceTemplate(tempProduct, product)
    res.end(output)
  } else if (pathname === "/api") {
    //API
    res.writeHead(200, { "Content-type": "applicaton/json" })
    res.end(data)
  } else {
    //Not Found
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello world",
    })
    res.end("<h1>Page Not Found</h1>")
  }

  // res.end("Hello from my first server ")
})

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to request on port 8000")
})
