

const { v4 } = require("uuid")
const { read_file, write_file } = require("../api/file-system")


//get
const getAllDrinks = (req, res) => {
    try {
        const fileData = read_file("drink.json")
        res.status(200).json(fileData)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
//add
const addDrink = (req, res) => {
    try {
        const { type, price } = req.body
        const fileData = read_file("drink.json")

        fileData.push({
            id: v4(),
            type,
            price
        })
        write_file("drink.json",fileData)
        res.status(201).json({
            message: "added new drink"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



//get_one
const getOneDrink = (req, res) => {
    try {
        const{id} = req.params
        
        const fileData = read_file("drink.json")

        const foundedDrink = fileData.find((item) => item.id === id)

        if (!foundedDrink) {
            return res.status(404).json({
                message: "drink not found"
            })
            
        }

        res.status(201).json(foundedDrink)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//update
const updateDrink = (req, res) => {
    try {
        const{id} = req.params
        const { type, price } = req.body

        const fileData = read_file("drink.json")

        const foundedDrink = fileData.find((item) => item.id === id)

        if (!foundedDrink) {
            return res.status(404).json({
                message: "drink not found"
            })
            
        }

        fileData.forEach((item) => {
            if(item.id === id){
                item.type= type ? type : item.type
                item.price= price ? price : item.price
            }
        } )

       write_file("drink.json",fileData)
        res.status(201).json({
            message: "updated new drink"
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//delete
const deleteDrink = (req, res) => {
    try {
        const{id} = req.params

        const fileData = read_file("drink.json")

        const foundedDrink = fileData.find((item) => item.id === id)

        if (!foundedDrink) {
            return res.status(404).json({
                message: "drink not found"
            })
            
        }

        fileData.forEach((item,index) => {
            if(item.id === id){
                fileData.splice(index,1)
            }
        } )

       write_file("drink.json",fileData)
        res.status(201).json({
            message: "deleted new drink"
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }


}

module.exports = {
    getAllDrinks,
    addDrink,
    getOneDrink,
    updateDrink,
    deleteDrink
}