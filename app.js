import express from "express"
import mainRoutes from "./app/mainRoutes.js"

const app = express()

app.use(express.json())

app.use(mainRoutes)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

export default app
