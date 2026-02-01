

const { v4 } = require("uuid")
const { read_file, write_file } = require("../api/file-system")


//get
const getAllCourses = (req, res) => {
    try {
        const fileData = read_file("course.json")
        res.status(200).json(fileData)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
//add
const addCourse = (req, res) => {
    try {
        const { title, price } = req.body
        const fileData = read_file("course.json")

        fileData.push({
            id: v4(),
            title,
            price
        })
        write_file("course.json",fileData)
        res.status(201).json({
            message: "added new course"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



//get_one
const getOneCourse = (req, res) => {
    try {
        const{id} = req.params
        
        const fileData = read_file("course.json")

        const foundedCourse = fileData.find((item) => item.id === id)

        if (!foundedCourse) {
            return res.status(404).json({
                message: "course not found"
            })
            
        }

        res.status(201).json(foundedCourse)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//update
const updateCourse = (req, res) => {
    try {
        const{id} = req.params
        const { title, price } = req.body

        const fileData = read_file("course.json")

        const foundedCourse = fileData.find((item) => item.id === id)

        if (!foundedCourse) {
            return res.status(404).json({
                message: "course not found"
            })
            
        }

        fileData.forEach((item) => {
            if(item.id === id){
                item.title= title ? title : item.title
                item.price= price ? price : item.price
            }
        } )

       write_file("course.json",fileData)
        res.status(201).json({
            message: "updated new course"
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//delete
const deleteCourse = (req, res) => {
    try {
        const{id} = req.params

        const fileData = read_file("course.json")

        const foundedCourse = fileData.find((item) => item.id === id)

        if (!foundedCourse) {
            return res.status(404).json({
                message: "course not found"
            })
            
        }

        fileData.forEach((item,index) => {
            if(item.id === id){
                fileData.splice(index,1)
            }
        } )

       write_file("course.json",fileData)
        res.status(201).json({
            message: "deleted new course"
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }


}

module.exports = {
    getAllCourses,
    addCourse,
    getOneCourse,
    updateCourse,
    deleteCourse
}