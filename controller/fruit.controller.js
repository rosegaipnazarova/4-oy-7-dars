

const { v4 } = require("uuid")
const { read_file, write_file } = require("../api/file-system")


//get
const getAllFruits = (req, res) => {
    try {
        const fileData = read_file("fruit.json")
        res.status(200).json(fileData)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
//add
const addFruit = (req, res) => {
    try {
        const { name, type } = req.body
        const fileData = read_file("fruit.json")

        fileData.push({
            id: v4(),
            name,
            type
        })
        write_file("fruit.json",fileData)
        res.status(201).json({
            message: "added new fruit"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



//get_one
const getOneFruit = (req, res) => {
    try {
        const{id} = req.params
        
        const fileData = read_file("fruit.json")

        const foundedFruit = fileData.find((item) => item.id === id)

        if (!foundedFruit) {
            return res.status(404).json({
                message: "fruit not found"
            })
            
        }

        res.status(200).json(foundedFruit)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//update
const updateFruit = (req, res) => {
    try {
        const{id} = req.params
        const { name, type } = req.body

        const fileData = read_file("fruit.json")

        const foundedFruit = fileData.find((item) => item.id === id)

        if (!foundedFruit) {
            return res.status(404).json({
                message: "fruit not found"
            })
            
        }

        fileData.forEach((item) => {
            if(item.id === id){
                item.name= name ? name : item.name
                item.type= type ? type : item.type
            }
        } )

       write_file("fruit.json",fileData)
        res.status(201).json({
            message: "updated new fruit"
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//delete
const deleteFruit = (req, res) => {
    try {
        const{id} = req.params

        const fileData = read_file("fruit.json")

        const foundedFruit = fileData.find((item) => item.id === id)

        if (!foundedFruit) {
            return res.status(404).json({
                message: "fruit not found"
            })
            
        }

        fileData.forEach((item,index) => {
            if(item.id === id){
                fileData.splice(index,1)
            }
        } )

       write_file("fruit.json",fileData)
        res.status(201).json({
            message: "deleted new fruit"
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }


}

module.exports = {
    getAllFruits,
    addFruit,
    getOneFruit,
    updateFruit,
    deleteFruit

}