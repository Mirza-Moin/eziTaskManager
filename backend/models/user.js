import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select:false,
    },
    role:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
    
})

export const User = mongoose.model('User',userSchema)