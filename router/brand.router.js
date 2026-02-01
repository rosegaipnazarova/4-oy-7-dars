const {Router} = require("express")
const { getAllBrands, addBrand, getOneBrand, updateBrand, deleteBrand } = require("../controller/brand.controller")

const brandRouter = Router()

brandRouter.get("/get_all_brands", getAllBrands)
brandRouter.post("/add_brand", addBrand)
brandRouter.get("/get_one_brand/:id",getOneBrand)
brandRouter.put("/update_brand/",updateBrand)
brandRouter.delete("/delete_brand",deleteBrand)




module.exports = brandRouter