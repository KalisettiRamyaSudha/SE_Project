const express = require("express")
const app = express()

const dotenv = require("dotenv")
dotenv.config()

const cors = require("cors")
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))
require("./db")

const AuthRoutes = require("./Routes/AuthRoutes") 
app.use("/api", AuthRoutes)
 

const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

