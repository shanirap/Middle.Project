const mongoose = require('mongoose')
const postsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        maxLength: 1000
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postsSchema)