const Todos = require("../Models/todosModel")

//get
const getAllTodos = async (req, res) => {
    const todos = await Todos.find().lean()
    if (!todos?.length) {
        return res.status(400).json({ message: 'There are no todos lists' })
    }
    res.json(todos)
}


//post
const createTodos = async (req, res) => {
    const { title, tags, completed } = req.body
    if (!title)
        return res.status(400).json({ message: 'Title is required' })
    const todos = await Todos.create({ title, tags, completed })
    if (todos) {
        res.json(todos)//.status(201).json({message: 'Todos list is created successfully'})
    }
    else {
        res.status(400).json({ message: 'Invalid todos list' })
    }
}


//put
const updateTodos = async (req, res) => {
    const { _id, title, tags, completed } = req.body
    if (!_id || !title) {
        return res.status(400).json({ message: 'Id and title are both required' })
    }
    const todos = await Todos.findById(_id).exec()
    if (!todos) {
        return res.status(400).json({ messege: 'Todos list is not found' })
    }
    todos.title = title
    todos.tags = tags
    todos.completed = completed

    const updatedTodos = await todos.save()

    res.json(`'${updatedTodos.title}' is updated`)
}


//delete
const deleteTodos = async (req, res) => {
    const { _id } = req.params
    const todos = await Todos.findById(_id).exec()
    if (!todos) {
        return res.status(400).json({ message: 'Todos is not found' })
    }
    const result = await todos.deleteOne()
    const reply = `Todos list '${_id} is deleted`
    res.json(reply)
}


module.exports = {
    getAllTodos,
    createTodos,
    updateTodos,
    deleteTodos
}
