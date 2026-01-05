const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db.config")
const path = require("path")
require("dotenv").config()
const cookieParser = require("cookie-parser")

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({origin: true, credentials: true}))
app.use(express.json())
app.use(cookieParser())

connectDB()

app.use("/images", express.static(path.join(__dirname, "rasm")))



app.listen( PORT, () => {
    console.log("server is running at:" + PORT);
})