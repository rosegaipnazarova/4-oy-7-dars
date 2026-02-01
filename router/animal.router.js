const {Router} = require("express")
const { getAllAnimals, addAnimal, getOneAnimal, updateAnimal, deleteAnimal } = require("../controller/animal.controller")

const animalRouter = Router()

animalRouter.get("/get_all_animals", getAllAnimals)
animalRouter.post("/add_animal", addAnimal)
animalRouter.get("/get_one_animal/:id",getOneAnimal)
animalRouter.put("/update_animal/:id",updateAnimal)
animalRouter.delete("/delete_animal",deleteAnimal)




module.exports = animalRouter