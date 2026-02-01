const {Router} = require("express")
const { getAllCourses, addCourse, getOneCourse, updateCourse, deleteCourse } = require("../controller/course.controller")

const courseRouter = Router()

courseRouter.get("/get_all_courses", getAllCourses)
courseRouter.post("/add_course", addCourse)
courseRouter.get("/get_one_course/:id",getOneCourse)
courseRouter.put("/update_course",updateCourse)
courseRouter.delete("/delete_course",deleteCourse)




module.exports = courseRouter