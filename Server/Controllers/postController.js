const Post = require("../Models/postsModel")

//get
const getAllPosts = async (req, res) => {
    const posts = await Post.find().lean()
    if (!posts?.length) {
        return res.status(400).json({ message: 'There are no posts' })
    }
    res.json(posts)
}


//post
const createPost = async (req, res) => {
    const { title, body } = req.body
    if (!title)
        return res.status(400).json({ message: 'Title is required' })
    const post = await Post.create({ title, body })
    if (post) {
        res.json(post)//.status(201).json({message: 'Post is created successfully'})
    }
    else {
        res.status(400).json({ message: 'Invalid post' })
    }
}


//put
const updatePost = async (req, res) => {
    const { _id, title, body } = req.body
    if (!_id || !title) {
        return res.status(400).json({ message: 'Id and title are both required' })
    }
    const post = await Post.findById(_id).exec()
    if (!post) {
        return res.status(400).json({ messege: 'Post is not found' })
    }
    post.title = title
    post.body = body

    const updatedPost = await post.save()

    res.json(`'${updatedPost.title}' is updated`)
}


//delete
const deletePost = async (req, res) => {
    const { _id } = req.params
    const post = await Post.findById(_id).exec()
    if (!post) {
        return res.status(400).json({ message: 'Post is not found' })
    }
    const result = await post.deleteOne()
    const reply = `Post '${_id}' is deleted`
    res.json(reply)
}


module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost
}
