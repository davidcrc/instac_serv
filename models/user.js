const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
        tim: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    avatar: {
        type: String,
        trim: true,
    },
    sitioWeb: {
        type: String,
        trim: true,
    },
    descripcion: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", UserSchema)