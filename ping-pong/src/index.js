import { createServer } from "http"

const PORT = process.env.PORT || 3001
let counter = 0

const server = createServer((req, res) => {
  if (req.url === "/" || req.url === "/pingpong") {
    counter++
  }
  res.statusCode = 200
  res.setHeader("Content-Type", "text/html")
  res.end(`pong ${counter}`)
})

server.listen(PORT)
console.log(`Server started in port ${PORT}`)
