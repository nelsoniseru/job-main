import User from "../models/user.model.js";
import Job from "../models/job.model.js";
import hashPassword from "../models/hash.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
export default class UserController {

    getIndex(req, res) {
        res.render('index',{u:req.cookies.u});
    }

    getRegister(req, res) {
        res.render('register', { success: false, message: null, error: null,u:null });
    }
   async getTalentProfile(req, res) {
        let jobs =  await Job.find({})

        res.render('talentprofile', { success: false, message: null, error:null, jobs:[],user:req.user,jobs,u:req.cookies.u });
    }
    async getRecruiterProfile(req, res) {
     let jobs =  await Job.find({user:req.user._id})
        res.render('recruiterprofile', { success: false, message: null, error:null, jobs:[],user:req.user,jobs,u:req.cookies.u });
    }
    
   async getAdminProfile(req, res) {
       let users = await User.find({verified:false, role:"talent"}); 
        res.render('adminprofile', { success: false, message: null, error:null, jobs:[],users,u:null });
    }
    getuserRegister(req, res) {
        res.render('user-reg', { success: false, message: null, error: null, u:req.cookies.u });
    }
    getApproval(req, res) {
        res.render('approval-table', { success: false, message: null, error: null, u:req.cookies.u });
    }


   async getReject(req, res) {
        const { id } = req.params
       let user = await User.findOne({_id:id})
       user.verified = false
       await user.save()
       let users = await User.find({verified:false}); 

    return res.render('adminprofile', { success:true, message: 'user registration rejected successfully', error:null,users,u:req.cookies.u })
        
    }
   async getApprove(req, res) {
        const { id } = req.params
        let user = await User.findOne({_id:id})
        user.verified = true
        await user.save()
        let users = await User.find({verified:false}); 

     return res.render('adminprofile', { success:true, message: 'user registration approved successfully', error:null,users,u:req.cookies.u })
    }



   async postRegister(req, res) {
        const { full_name, email, password } = req.body;
        const userAlreadyExists = await User.findOne({email});

        if(userAlreadyExists) {
            return res.render('register', { success: false, message: null, error: 'Email already exists.',u:req.cookies.u })
        }
        const hash = await hashPassword(password)
      await User.create({full_name, email, password:hash,role:"recruiter",verified:true}); 
        res.render('register', { success: true, message: 'User created successfully!', error: null,u:req.cookies.u })
    }
    async postuserRegister(req, res) {
        const { full_name,nin,intro,github,linkedn, email, password } = req.body;
       
        const userAlreadyExists = await User.findOne({email:email});
        console.log(userAlreadyExists)
        if(userAlreadyExists) {
            return res.render('user-reg', { success: false, message: null, error: 'Email already exists.',u:req.cookies.u })
        }
        const hash = await hashPassword(password)
      await User.create({full_name,nin,intro,github,linkedn, email, password:hash, cv:req.file.path}); 
        res.render('user-reg', { success: true, message: 'User created successfully!', error: null,u:req.cookies.u })
    }


    getLogin(req, res) {
        res.render('login', { error: null,u:req.cookies.u });
    }

   async postLogin(req, res) {


        const { email, password } = req.body;
        const user = await User.findOne({ email });
      
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('login', {
                error: 'Invalid credentials',
                userEmail: email
            });
        
        }
      
        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '5h' });
        res.cookie('u',user , {
            maxAge: 2*24*60*60*1000
        });
        res.cookie('token', token, { httpOnly: true });
        if(user.role=="talent") return res.redirect('/all-jobs');
        if(user.role=="admin") return res.redirect('/admin-profile');
        if(user.role=="recruiter") return res.redirect('/recruiter-profile');
      
    }

    logout(req, res) {

        req.session.destroy( (err) => {
            if(err) {
            } else {
                res.clearCookie('lastVisit');
                res.clearCookie('token');
                res.clearCookie('u');
                res.redirect('/login')
            }
        })
    }
    
}