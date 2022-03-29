const fs = require("fs")
const server = require("http").createServer() // creating a new server

server.on("request", (req, res) => {
  //solution 1: the problem with this solution is that node will have to get load the whole file into memory
//   fs.readFile("/test-file.txt", (err, data) => {
//     if (err) console.log(err)
//     res.end(data)
//   })

//   // solution 2: streams, this soltion has a problem called BACk PRESSURE, which is when the readable stream is reading the data faster than the writable stream can send the response data
//   const readable = fs.createReadStream("test-file.txt")
//   readable.on("data", (chunk) => {
//     res.write(chunk)
//   })

//   readable.on('end', () => {
//       res.end()
//   } )

//   readable.on('error', err =>{
//       console.log(err)
//       res.statusCode(500)
//       res.end('file not found')
//   })

// solution 3:
  const readable = fs.createReadStream("test-file.txt")
  readable.pipe(res)
  //readableSource.pipe(writtable Destination)


})

server.listen(8000, "127.0.0.1", () => {
  console.log("listening.....")
})
