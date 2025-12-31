import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    avatarUrl: {
        type: String
    },
    avatarId: {
        type: String
    },
    displayName: {
        type: String,
        require: true,
        trim: true
    },
    bio: {
        type: String,
        maxlength: 600,
    },
    phone: {
        type: String,
        sparse: true
    }
},
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)
export default User;