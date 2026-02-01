const {Router} = require("express")
const { getAllFruits, getOneFruit, addFruit, updateFruit, deleteFruit } = require("../controller/fruit.controller")

const fruitRouter = Router()

fruitRouter.get("/get_all_fruits", getAllFruits)
fruitRouter.post("/add_fruit", addFruit)
fruitRouter.get("/get_one_fruit/:id",getOneFruit)
fruitRouter.put("/update_fruit",updateFruit)
fruitRouter.delete("/delete_fruit",deleteFruit)




module.exports = fruitRouter