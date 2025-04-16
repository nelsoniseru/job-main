
import mongoose from "mongoose"
const applicationSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
 
        status: { 
            type: String,
            enum: ["pending","accepted","declined"],
             default:"pending"
            },
  
    job:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job',
          },
      
},{
    timestamps:true
}
)
const Application = mongoose.model("Application",applicationSchema)
export default Application

// Application.deleteMany().then((e)=>{
//     console.log("ff")
//   })

// Application.find().then(e=>{
//     console.log(e)
// })