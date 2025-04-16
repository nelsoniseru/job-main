
import mongoose from "mongoose"
const jobSchema = new mongoose.Schema({
    designation:String,
    companyName:String,
    location:String,
    category:String,
    salary:Number,
    totalPositions:Number,
    skills:[String],
    expiry_date:Date,  
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
},{
    timestamps:true
}
)
const Job = mongoose.model("Job",jobSchema)
export default Job


  

// { 
//     id: 1, 
//     designation: 'SDE',
//     location: 'Mumbai',
//     category: 'Tech',
//     companyName: 'Accenture',
//     salary: '8 Lpa',
//     totalPositions: '40',
//     skills: [ 'NodeJs', 'ReactJS', 'MongoDB' ],
//     applyby: '2023-12-30',
//     userId: 1,
//     timeStamp: "03 Jan 2024 11:24 PM",
//     applications: [
//         {
//             applicationId: 1,
//             name: 'Nikhil Shah',
//             email: 'nikhil.shah12@gmail.com',
//             contact: '8987766554',
//             resumeUrl: 'resumes/resume-template.pdf',
//             timeStamp: '02 Jan 2024 11:24 PM'
//         },
//         {
//             applicationId: 2,
//             name: 'Sourabh Patel',
//             email: 'sourabh24patel@gmail.com',
//             contact: '7898091324',
//             resumeUrl: 'resumes/resume.pdf',
//             timeStamp: '04 Jan 2024 05:26 AM'
//         },
//         {
//             applicationId: 3,
//             name: 'Tirth Desai',
//             email: 'tirth.desai21@gmail.com',
//             contact: '9098567508',
//             resumeUrl: 'resumes/resume.pdf',
//             timeStamp: '07 Jan 2024 07:26 AM'
//         },
//         {
//             applicationId: 4,
//             name: 'Ankush Roy',
//             email: 'amkushroy@gmail.com',
//             contact: '6765341120',
//             resumeUrl: 'resumes/resume-template.pdf',
//             timeStamp: '08 Jan 2024 09:26 AM'
//         }
//     ],