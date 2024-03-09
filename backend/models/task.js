import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        
    },
    description:{
        type: String,
        required: true,
       
    },
    status: {
        type: String,
        required: true,
    },
    feedback:[{
        user:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
        userName: String,
        description: String,
        status: String
    }
    ],

    createdAt: {
        type: Date,
        default: Date.now(),
    }
    
})

export const Task = mongoose.model('Task',taskSchema)