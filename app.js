import express from "express"
import mainRoutes from "./app/mainRoutes.js"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

app.use(mainRoutes)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

export default app
