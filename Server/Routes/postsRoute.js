const express = require("express")
const router = express.Router()
const postController = require("../Controllers/postController")


//get
router.get("/get", postController.getAllPosts)


//post
router.post("/post", postController.createPost)


//put
router.put("/put", postController.updatePost)


//delete
router.delete("/delete/:_id", postController.deletePost)


module.exports = router