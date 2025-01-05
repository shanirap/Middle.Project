const express = require("express")
const router = express.Router()
const userController = require("../Controllers/userController")


//get
router.get("/get", userController.getAllUsers)


//post
router.post("/post", userController.createUser)


//put
router.put("/put", userController.updateUser)


//delete
router.delete("/delete/:_id", userController.deleteUser)


module.exports = router