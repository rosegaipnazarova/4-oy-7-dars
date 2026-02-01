

const { v4 } = require("uuid")
const { read_file, write_file } = require("../api/file-system")


//get
const getAllProducts = (req, res) => {
    try {
        const fileData = read_file("product.json")
        res.status(200).json(fileData)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
//add
const addProduct = (req, res) => {
    try {
        const { title, desc } = req.body
        const fileData = read_file("product.json")

        fileData.push({
            id: v4(),
            title,
            desc
        })
        write_file("product.json",fileData)
        res.status(201).json({
            message: "added new product"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



//get_one
const getOneProduct = (req, res) => {
    try {
        const{id} = req.params
        
        const fileData = read_file("product.json")

        const foundedProduct = fileData.find((item) => item.id === id)

        if (!foundedProduct) {
            return res.status(404).json({
                message: "product not found"
            })
            
        }

        res.status(201).json()

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//update
const updateProduct = (req, res) => {
    try {
        const{id} = req.params
        const { title, desc } = req.body

        const fileData = read_file("product.json")

        const foundedProduct = fileData.find((item) => item.id === id)

        if (!foundedProduct) {
            return res.status(404).json({
                message: "product not found"
            })
            
        }

        fileData.forEach((item) => {
            if(item.id === id){
                item.title= title ? title : item.title
                item.desc= desc ? desc : item.desc
            }
        } )

       write_file("product.json",fileData)
        res.status(201).json({
            message: "updated new product"
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//delete
const deleteProduct = (req, res) => {
    try {
        const{id} = req.params

        const fileData = read_file("product.json")

        const foundedProduct = fileData.find((item) => item.id === id)

        if (!foundedProduct) {
            return res.status(404).json({
                message: "product not found"
            })
            
        }

        fileData.forEach((item,index) => {
            if(item.id === id){
                fileData.splice(index,1)
            }
        } )

       write_file("product.json",fileData)
        res.status(201).json({
            message: "deleted new product"
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }


}

module.exports = {
    getAllProducts,
    addProduct,
    getOneProduct,
    updateProduct,
    deleteProduct
}