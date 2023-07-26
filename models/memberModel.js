const mongoose = require('mongoose')
const Schema = mongoose.Schema

const memberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: { 
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Member', memberSchema)