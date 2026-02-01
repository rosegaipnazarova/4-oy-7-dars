const express= require("express")
require("dotenv").config()
const cors = require("cors")
const productRouter = require("./router/product.router")
const userRouter = require("./router/user.router")
const animalRouter = require("./router/animal.router")
const brandRouter = require("./router/brand.router")
const courseRouter = require("./router/course.router")
const drinkRouter = require("./router/drink.router")
const fruitRouter = require("./router/fruit.router")


const app = express()

const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())


//router
app.use(productRouter)
app.use(userRouter)
app.use(brandRouter)
app.use(animalRouter)
app.use(courseRouter)
app.use(drinkRouter)
app.use(fruitRouter)

app.listen(PORT,() =>{
    console.log("Server is running...");
    
})
