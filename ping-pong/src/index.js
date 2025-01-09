import path from "path"
import { createServer } from "http"
import { writeFile, mkdirSync } from "fs"

const PORT = process.env.PORT || 3001
let counter = 0

const directory = path.join("/", "usr", "src", "app", "shared")
const filePath = path.join(directory, "pingcount.txt")

mkdirSync(directory, { recursive: true }, (err) => {
  if (err) {
    console.error("Error creating directory", err)
  }
})

const server = createServer((req, res) => {
  if (req.url === "/" || req.url === "/pingpong") {
    counter++
  }

  writeFile(filePath, String(counter), (err) => {
    if (err) {
      console.error("Error writing to file", err)
    }
  })

  res.statusCode = 200
  res.setHeader("Content-Type", "text/html")
  res.end(`pong ${counter}`)
})

server.listen(PORT)
console.log(`Server started in port ${PORT}`)
