const EventEmitter = require("events") // requiring the event module
const http = require("http")

class Sales extends EventEmitter {
  constructor() {
    super()
  }
}
const myEmmiter = new Sales() //creating an instance of the emitter

// this listens for when a particular event is emitted and runs a callback function
myEmmiter.on("newSale", () => {
  console.log("a new sale made")
})

// a single event can have muliple listeners
myEmmiter.on("newSale", () => {
  console.log("Customer name: Jonas")
})

myEmmiter.on("newSale", (stock) =>
  console.log(`There are now ${stock} items left in stock`)
)

// this emits the named event we want
myEmmiter.emit("newSale", 7)

//?

///////////////////////////////////////////////////////

const server = http.createServer()

server.on("request", (req, res) => {
  console.log("request recieved")
  console.log(req.url)
  res.end("Request recieved")
})

server.on("request", (req, res) => {
  console.log("Another Request recieved")
})

server.on("close", () => {
  console.log("close")
})

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to request on port 8000")
})
