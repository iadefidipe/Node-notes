const fs = require("fs") // file system built-in module

//reading and writing data into files
/**
 * fs.readFileSync => sync stands for synchronronous. use this method to read synchronous files
 * fs.readFileSync => fs.readFileSync(*path to the file we are reading*, *character encoding*)
 */
//reading from a file
const textIn = fs.readFileSync("./txt/input.txt", "utf-8")

//writibg files sychronously
const textOut = `This is what we know about th avocado: ${textIn}. \n Created on ${Date.now()}`
fs.writeFileSync("./txt/output.txt", textOut)

//non-blocking, aschronous way
fs.readFile("./txt/start.txt", "utf-8", (error, data) => {
  console.log(data)
  fs.readFile(`./txt/${data}.txt`, "utf-8", (error, data1) => {
    console.log(data1)
    fs.writeFile("./txt/final.txt", `${data1}\n${data}`, "utf-8", error => {
      console.log(error) 
    })
  })
})
