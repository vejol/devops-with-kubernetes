import path from "path"
import { createServer } from "http"
import { readFileSync } from "fs"

const PORT = process.env.PORT || 3001
const filePath = path.join("/", "usr", "src", "app", "files", "hash.txt")

const readHash = () => {
  try {
    return readFileSync(filePath, "utf8")
  } catch (err) {
    console.error("Error reading hash file", err)
  }
}

const server = createServer((req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "text/html")
  res.end(readHash())
})

server.listen(PORT)
console.log(`Server started in port ${PORT}`)
