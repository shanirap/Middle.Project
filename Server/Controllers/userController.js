const User = require("../Models/usersModel")

//get
const getAllUsers = async (req, res) => {
    const users = await User.find().lean()
    if (!users?.length) {
        return res.status(400).json({ message: 'There are no users' })
    }
    res.json(users)
}


//post
const createUser = async (req, res) => {
    const { name, userName, email, address, phone } = req.body
    if (!name || !email)
        return   res.status(400).json('Name and email are both required')
    const user = await User.create({ name, userName, email, address, phone })
    if (user) {
        res.json(user)//.status(201).json({message: 'User is created successfully'})
    }
    else {
        res.status(400).json({ message: 'Invalid user' })
    }
}


//put
const updateUser = async (req, res) => {
    const { _id, name, userName, email, address, phone } = req.body
    if (!_id || !name || !email) {
        return res.status(400).json({ message: 'Id, name and email are all required' })
    }
    const user = await User.findById(_id).exec()
    if (!user) {
        return res.status(400).json({ messege: 'User is not found' })
    }
    user.name = name
    user.userName = userName
    user.email = email
    user.address = address
    user.phone = phone

    const updatedUser = await user.save()

    res.json(`'${updatedUser.name}' is updated`)
}


//delete
const deleteUser = async (req, res) => {
    const { _id } = req.params
    const user = await User.findById(_id).exec()
    if (!user) {
        return res.status(400).json({ message: 'User is not found' })
    }
    const result = await user.deleteOne()
    const reply = `User '${_id} is deleted`
    res.json(reply)
}


module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}
