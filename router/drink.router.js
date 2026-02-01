const {Router} = require("express")
const { getAllDrinks, addDrink, getOneDrink, updateDrink, deleteDrink } = require("../controller/drink.controller")

const drinkRouter = Router()

drinkRouter.get("/get_all_drinks", getAllDrinks)
drinkRouter.post("/add_drink", addDrink)
drinkRouter.get("/get_one_drink/:id",getOneDrink)
drinkRouter.put("/update_drink",updateDrink)
drinkRouter.delete("/delete_drink",deleteDrink)




module.exports = drinkRouter