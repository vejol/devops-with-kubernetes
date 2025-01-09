import path from "path"
import { randomBytes } from "crypto"
import { writeFile, mkdirSync } from "fs"

const randomChars = randomBytes(10).toString("hex")

const directory = path.join("/", "usr", "src", "app", "files")
const filePath = path.join(directory, "hash.txt")

mkdirSync(directory, { recursive: true }, (err) => {
  if (err) {
    console.error("Error creating directory", err)
  }
})

setInterval(() => {
  const content = `${new Date().toISOString()}: ${randomChars}`
  writeFile(filePath, content, (err) => {
    if (err) {
      console.error("Error writing to file", err)
    }
  })
}, 5000)
