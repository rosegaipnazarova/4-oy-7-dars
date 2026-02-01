

const { v4 } = require("uuid")
const { read_file, write_file } = require("../api/file-system")


//get
const getAllAnimals = (req, res) => {
    try {
        const fileData = read_file("animal.json")
        res.status(200).json(fileData)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
//add
const addAnimal = (req, res) => {
    try {
        const { name, species,age } = req.body
        const fileData = read_file("animal.json")

        fileData.push({
            id: v4(),
            name,
            species,
            age
        })
        write_file("animal.json",fileData)
        res.status(201).json({
            message: "added new animal"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



//get_one
const getOneAnimal = (req, res) => {
    try {
        const{id} = req.params
        
        const fileData = read_file("animal.json")

        const foundedAnimal = fileData.find((item) => item.id === id)

        if (!foundedAnimal) {
            return res.status(404).json({
                message: "animal not found"
            })
            
        }

        res.status(201).json(foundedAnimal)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//update
const updateAnimal = (req, res) => {
    try {
        const{id} = req.params
        const { name, species,age } = req.body

        const fileData = read_file("animal.json")

        const foundedAnimal = fileData.find((item) => item.id === id)

        if (!foundedAnimal) {
            return res.status(404).json({
                message: "animal not found"
            })
            
        }

        fileData.forEach((item) => {
            if(item.id === id){
                item.name= name ? name : item.name
                item.species= species ? species : item.species
                item.age= age ? age : item.age
            }
        } )

       write_file("animal.json",fileData)
        res.status(200).json({
            message: "updated new animal"
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//delete
const deleteAnimal = (req, res) => {
    try {
        const{id} = req.params

        const fileData = read_file("animal.json")

        const foundedAnimal = fileData.find((item) => item.id === id)

        if (!foundedAnimal) {
            return res.status(404).json({
                message: "animal not found"
            })
            
        }

        fileData.forEach((item,index) => {
            if(item.id === id){
                fileData.splice(index,1)
            }
        } )

       write_file("animal.json",fileData)
        res.status(200).json({
            message: "deleted new animal"
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }


}

module.exports = {
    getAllAnimals,
    addAnimal,
    getOneAnimal,
    updateAnimal,
    deleteAnimal
}