const mongoose = require('mongoose')
const todosSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    tags: [{
        type: String,
    }],
    completed: {
        type: Boolean,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('todo', todosSchema)