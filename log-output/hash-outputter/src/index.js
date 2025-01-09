import path from "path"
import { createServer } from "http"
import { readFileSync } from "fs"

const PORT = process.env.PORT || 3001

const hashFilePath = path.join("/", "usr", "src", "app", "files", "hash.txt")
const pingCountFilePath = path.join(
  "/",
  "usr",
  "src",
  "app",
  "shared",
  "pingcount.txt"
)

const readHash = () => {
  try {
    return readFileSync(hashFilePath, "utf8")
  } catch (err) {
    console.error("Error reading hash file", err)
  }
}

const readPingCount = () => {
  try {
    return readFileSync(pingCountFilePath, "utf8")
  } catch (err) {
    console.error("Error reading ping count file", err)
    return 0
  }
}

const server = createServer((req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "text/html")
  res.end(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>log-output</title>
      </head>
      <body>
        <p>${readHash()}</p>
        <p>Ping / Pongs: ${readPingCount()}</p>
      </body>
    </html>`)
})

server.listen(PORT)
console.log(`Server started in port ${PORT}`)
