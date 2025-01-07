import { createServer } from "http"

const PORT = process.env.PORT || 3001

const server = createServer((req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "text/plain")
  res.end("Hello, World!\n")
})

server.listen(PORT)
console.log(`Server started in port ${PORT}`)
