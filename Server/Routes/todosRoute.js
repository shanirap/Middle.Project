const express = require("express")
const router = express.Router()
const todosController = require("../Controllers/todosController")


//get
router.get("/get", todosController.getAllTodos)


//post
router.post("/post", todosController.createTodos)


//put
router.put("/put", todosController.updateTodos)


//delete
router.delete("/delete/:_id", todosController.deleteTodos)


module.exports = router