

const { v4 } = require("uuid")
const { read_file, write_file } = require("../api/file-system")


//get
const getAllUsers = (req, res) => {
    try {
        const fileData = read_file("user.json")
        res.status(200).json(fileData)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
//add
const addUser = (req, res) => {
    try {
        const { username, email } = req.body
        const fileData = read_file("user.json")

        fileData.push({
            id: v4(),
            username,
            email
        })
        write_file("user.json",fileData)
        res.status(201).json({
            message: "added new user"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



//get_one
const getOneUser = (req, res) => {
    try {
        const{id} = req.params
        
        const fileData = read_file("user.json")

        const foundedUser = fileData.find((item) => item.id === id)

        if (!foundedUser) {
            return res.status(404).json({
                message: "user not found"
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
const updateUser = (req, res) => {
    try {
        const{id} = req.params
        const { username, email } = req.body

        const fileData = read_file("user.json")

        const foundedUser = fileData.find((item) => item.id === id)

        if (!foundedUser) {
            return res.status(404).json({
                message: "user not found"
            })
            
        }

        fileData.forEach((item) => {
            if(item.id === id){
                item.username= username ? username : item.username
                item.email= email ? email : item.email
            }
        } )

       write_file("user.json",fileData)
        res.status(201).json({
            message: "updated new user"
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//delete
const deleteUser = (req, res) => {
    try {
        const{id} = req.params

        const fileData = read_file("user.json")

        const foundedUser = fileData.find((item) => item.id === id)

        if (!foundedUser) {
            return res.status(404).json({
                message: "user not found"
            })
            
        }

        fileData.forEach((item,index) => {
            if(item.id === id){
                fileData.splice(index,1)
            }
        } )

       write_file("user.json",fileData)
        res.status(201).json({
            message: "deleted new user"
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }


}

module.exports = {
    getAllUsers,
    addUser,
    getOneUser,
    updateUser,
    deleteUser
}