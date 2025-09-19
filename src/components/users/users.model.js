import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    userId: { type: Number, unique: true, Comment: 'Custom user ID' },
    name: { type: String, required: true, Comment: 'Full name of the user'},
    email: { type: String, required: true, unique: true, Comment: 'Email address of the user'},
    password: { type: String, required: true, Comment: 'Hashed password for user authentication'},
    age: { type: Number, required: true, Comment: 'Age of the user'},
    ocupation: { type: String, required: true, Comment: 'Occupation of the user'},
    avatarUrl: { type: String, Comment: 'URL of the user avatar image'},
    createdAt: { type: Date, default: Date.now, Comment: 'Timestamp when the user was created' },
    updatedAt: { type: Date, default: Date.now, Comment: 'Timestamp when the user was last updated' },
})


userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
    this.updatedAt = Date.now()
    next()
})

const userModel = mongoose.model("User", userSchema)

export default userModel