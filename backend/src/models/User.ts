import mongoose, { Error} from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../types/user";



const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    bio:{
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default: ""
    },
    nativeLanguage: {
        type: String,
        default: ""
    },
    learningLanguage: {
        type: String,
        default: ""
    },
    isOnboarded:{
        type: Boolean,
        default: false
    },
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
},{timestamps: true});


userSchema.pre<IUser>("save", async function(next) {

    if(!this.isModified("password")){
        return next();
    }

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch(err){
        next(err as Error);
    }
})

userSchema.methods.comparePassword = async function(enteredPassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (err) {
        throw new Error("Error comparing passwords");
    }
};
const User = mongoose.model<IUser>("User", userSchema);


export default User;