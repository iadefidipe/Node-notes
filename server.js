const http = require("http") //module to create server
const url = require("url") // module to catch route

//Todo: Creating a simple server

const server = http.createServer((req, res) => {
  console.log(req.url)
  //* ROUTING

  const pathName = req.url

  if (pathName === "/" || pathName === "/about") {
    res.end(" THis the about page")
  } else if (pathName === "/product") {
    res.end(" trabaye ")
  } else {
    res.writeHead(404)
    res.end("Page Not Found")
  }

  // res.end("Hello from my first server ")
})

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to request on port 8000")
})
