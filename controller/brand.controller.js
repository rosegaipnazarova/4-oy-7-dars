

const { v4 } = require("uuid")
const { read_file, write_file } = require("../api/file-system")


//get
const getAllBrands = (req, res) => {
    try {
        const fileData = read_file("brand.json")
        res.status(200).json(fileData)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
//add
const addBrand = (req, res) => {
    try {
        const { country,name, logo } = req.body
        const fileData = read_file("brand.json")

        fileData.push({
            id: v4(),
            country,
            name,
            logo
        })
        write_file("brand.json",fileData)
        res.status(201).json({
            message: "added new brand"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



//get_one
const getOneBrand = (req, res) => {
    try {
        const{id} = req.params
        
        const fileData = read_file("brand.json")

        const foundedBrand = fileData.find((item) => item.id === id)

        if (!foundedBrand) {
            return res.status(404).json({
                message: "brand not found"
            })
            
        }

        res.status(201).json(foundedBrand)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//update
const updateBrand = (req, res) => {
    try {
        const{id} = req.params
        const { country,name, logo } = req.body

        const fileData = read_file("brand.json")

        const foundedBrand = fileData.find((item) => item.id === id)

        if (!foundedBrand) {
            return res.status(404).json({
                message: "brand not found"
            })
            
        }

        fileData.forEach((item) => {
            if(item.id === id){
                item.country= country ? country : item.country
                item.logo= logo ? logo : item.logo
                item.name= name ? name : item.name
            }
        } )

       write_file("brand.json",fileData)
        res.status(201).json({
            message: "updated new brand"
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//delete
const deleteBrand = (req, res) => {
    try {
        const{id} = req.params

        const fileData = read_file("brand.json")

        const foundedBrand = fileData.find((item) => item.id === id)

        if (!foundedBrand) {
            return res.status(404).json({
                message: "brand not found"
            })
            
        }

        fileData.forEach((item,index) => {
            if(item.id === id){
                fileData.splice(index,1)
            }
        } )

       write_file("brand.json",fileData)
        res.status(201).json({
            message: "deleted new brand"
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }


}

module.exports = {
    getAllBrands,
    addBrand,
    getOneBrand,
    updateBrand,
    deleteBrand
}