import Job from "../models/job.model.js";
import Application from "../models/applications.js";
import moment from "moment";

import dotenv from 'dotenv';
dotenv.config();

export default class JobController {

    getNewJob(req, res) {
        
        const jobData = {
            companyName: '',
            location: '',
            salary: '',
            totalPositions: '',
            applyby: '',
            category: '',
            designation: '',
            skills: [],
        }
        res.render('new-job', { 
            error: null,
            success: false,
            userId: req.session.userId, 
            userEmail: req.session.userEmail,
            jobData: jobData,
            u:req.cookies.u
        });
    }

  async postNewJob(req, res) {
        
        const { companyName, location, salary, totalPositions, category, designation, skills, expiry_date } = req.body;
        //const timeStamp = moment().format('DD MMM YYYY hh:mm A');
        let jobData = await Job.create({...req.body,user:req.user._id})
        res.render('new-job', { 
            success: true, 
            message: 'Job created successfully!',
            userId: req.session.userId,
            userEmail: req.session.userEmail,
            error: null, 
            jobData: jobData,
            u:req.cookies.u
        });

    }
   
    async getJobRec(req,res){
        const id = req.params.id;
        const jobFound =await Job.findOne({_id:id});
        
        if(jobFound) {
        res.render('job-details-rec', {
            jobData: jobFound,
            error: null,
            u:req.cookies.u,
            applicationSubmitted: false,
            formatDate: function (inputDate) {
                const date = new Date(inputDate);
                const options = { day: 'numeric', month: 'short', year: 'numeric' };
                return date.toLocaleDateString('en-GB', options);
            }
        })
    }
}
  async getAllJobsForApplicants(req, res) {
        const jobs = await Job.find();
        res.render('all-jobs-for-applicants', { jobs: jobs, u:req.cookies.u });
    }

   async getJobs(req, res) {
        const jobs = await Job.find({user:req.cookies.u._id});
        res.render('all-jobs', {
            userEmail: req.session.userEmail,
            userId: req.session.userId, 
            jobs:jobs,
            u:req.cookies.u
        });
    }

   async getJobById(req, res) {

        const id = req.params.id;
        const jobFound = await Job.findOne({_id:id});
        const jobApplication = await Application.findOne({job:id,user:req.user._id});
       //const j= await Application.find({});
        if(jobFound) {
            res.render('job-details', {
                jobData: jobFound,
                success:false,
                error: null,
                u:req.cookies.u,
                applicationSubmitted: false,
                jobApplication,
                formatDate: function (inputDate) {
                    const date = new Date(inputDate);
                    const options = { day: 'numeric', month: 'short', year: 'numeric' };
                    return date.toLocaleDateString('en-GB', options);
                }
            })
        } else {
            res.status(401).render('404', { type: 'Job'});
        }
    }

    async deleteJob(req, res) {
        const id = req.params.id;
        const jobFound = await Job.find({_id:req.params.id});

        if(!jobFound) {
            return res.status(401).render('404', { type: 'Job'});
        }
       await Job.deleteOne({_id:req.params.id});
      res.status(200).json({ok:true})
    }

   async getUpdateJobView(req, res) {
        
        const id = req.params.id;
        const jobFound = await Job.findOne({_id:id});

        if(jobFound) {
            res.render('update-job', {
                jobData: jobFound, 
                error: null,
                success: false,
                userEmail: req.session.userEmail,
                userId: req.session.userId,
                u:req.cookies.u
            });
        } else {
            res.status(401).render('404', { type: 'Job',u:null});
        }
    }

    async postUpdateJob(req, res) {

        await Job.updateOne({_id:req.params.id},{$set:req.body});
        res.redirect("/recruiter-jobs/"+req.params.id)
      
    }

   async getJobApplications(req, res) {
        const id = req.params.id;
        const jobApplications = await Application.find({job:id}).populate("job").populate("user").exec();
        return res.render('view-applications', { 
            applications: jobApplications,
            userEmail: req.session.userEmail,
            userId: req.session.userId, 
            u:req.cookies.u,
            success:null,
        });
    }
 async getApplications(req, res){
        const user = res.locals.u._id;
        console.log(user)
        const jobApplications = await Application.find({user}).populate("job").populate("user").exec();
        console.log(jobApplications)
        return res.render('application-view', { 
            applications: jobApplications,
            userEmail: req.session.userEmail,
            userId: req.session.userId, 
            u:req.cookies.u,
            success:null,
        });
    }
    searchJobs(req, res) {
        const searchResults = JobModel.getJobsBySearch(req.body.search);
        res.render('all-jobs-for-applicants', { jobs: searchResults,u:null });
        return;
    }

    async ApplyJob(req, res, next) {

        const id = req.params.id;
        const jobApplication = await Application.findOne({job:id,user:req.user._id});
        if(!jobApplication){
            await Application.create({job:id,user:req.user._id});
        }
        const jobFound = await Job.findOne({_id:id});
        if(jobFound) {
            res.render('job-details', {
                jobData: jobFound,
                success:true,
                error: null,
                jobApplication,
                u:req.cookies.u,
                applicationSubmitted:false,
                formatDate: function (inputDate) {
                    const date = new Date(inputDate);
                    const options = { day: 'numeric', month: 'short', year: 'numeric' };
                    return date.toLocaleDateString('en-GB', options);
                }
            })
        }

    }
   async acceptJob(req, res, next){
        const id = req.params.id;
        const job = req.params.job;

        const jobApplication = await Application.findOne({user:id}).populate("user").exec();
       jobApplication.status = "accepted"
       const jobApplications = await Application.find({job}).populate("user").exec();
console.log(jobApplications)
       await jobApplication.save()
       return res.render('view-applications', { 
        applications: jobApplications,
        userEmail: req.session.userEmail,
        userId: req.session.userId, 
        u:req.cookies.u,
        success:true,
        message:"Job application accepted successfully"
    });
     
    }
  async declineJob(req, res, next){
        const id = req.params.id;
        const job = req.params.job;
        const jobApplication = await Application.findOne({user:id}).populate("user").exec();
        const jobApplications = await Application.find({job}).populate("user").exec();
        jobApplication.status = "declined"
        await jobApplication.save()

        return res.render('view-applications', { 
            applications: jobApplications,
            userEmail: req.session.userEmail,
            userId: req.session.userId, 
            u:req.cookies.u,
            success:true,
            message:"Job application declined successfully"
        });
  }
}
