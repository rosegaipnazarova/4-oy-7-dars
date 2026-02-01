const {Router} = require("express")
const { getAllUsers, addUser, getOneUser, updateUser, deleteUser } = require("../controller/user.controller")

const userRouter = Router()

userRouter.get("/get_all_users", getAllUsers)
userRouter.post("/add_user", addUser)
userRouter.get("/get_one_user/:id",getOneUser)
userRouter.put("/update_user",updateUser)
userRouter.delete("/delete_user",deleteUser)




module.exports = userRouter