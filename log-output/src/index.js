import { randomBytes } from "crypto"

const randomString = randomBytes(10).toString("hex")

setInterval(() => {
  console.log(`${new Date().toISOString()}: ${randomString}`)
}, 5000)
