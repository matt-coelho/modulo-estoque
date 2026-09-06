import 'dotenv/config'
import server from "./server/server.js"

const port = process.env.NODEJSPORT

server.listen(port, () => {
  console.log(`API running ${port}`)
})
