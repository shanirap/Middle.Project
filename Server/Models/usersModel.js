const mongoose = require('mongoose')
const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        // default: name
    },
    email: {
        type: String,
        immutable: true,
        required: true
    },
    address: {
        type: String
    },
    phone: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', usersSchema)