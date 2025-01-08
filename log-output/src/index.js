import { randomBytes } from "crypto"
import { createServer } from "http"

const randomChars = randomBytes(10).toString("hex")
let string

setInterval(() => {
  string = `${new Date().toISOString()}: ${randomChars}`
  console.log(string)
}, 5000)

const PORT = process.env.PORT || 3001

const server = createServer((req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "text/html")
  res.end(string)
})

server.listen(PORT)
console.log(`Server started in port ${PORT}`)
