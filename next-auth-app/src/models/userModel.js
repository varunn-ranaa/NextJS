import mongoose from 'mongoose'

const userSchema  = new mongoose.Schema({
    username : {
        type : String,
        required : [true , "Username is required."],
        unique : true
    },
    password : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    VerifyToken : String,
    VerifyTokenExpiry : Date
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;