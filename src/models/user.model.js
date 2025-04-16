import mongoose from "mongoose"
import hashPassword from "../models/hash.js"
const userSchema = new mongoose.Schema({
        email:String,
        full_name:String,
        password:String,
        nin:String,
        bio_link:String,
        cv:String,
        linkedn:String,
        github:String,
        role: { 
        type: String,
        enum: ["admin","recruiter","talent"],
        default:"talent",
        },
        status: { 
            type: String,
            enum: ["pending","approved"],
           
            },
        verified:{
            type:Boolean,
            default:false
        },
},{
    timestamps:true
}
)
const User = mongoose.model("User",userSchema)
export default User

// User.deleteOne({_id:"661181d678b946579e3a3295"}).then(()=>{
//   console.log("dele")
// })
// User.find().then(e=>{
//     console.log(e)
// })

async function a(){
const hash = await hashPassword("Admin@2024")
User.create({
    email:"admin@gmail.com",
    password:hash,
    verified:true,
    role:"admin"
}).then(e=>{
    console.log("yes created")
})
}
// a()
