import express from 'express'
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://afrirewards:Afri12345Rewards@afrirewards.da6lul0.mongodb.net/job-portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});



import UserController from './src/controllers/user.controller.js';
import JobController from './src/controllers/job.controller.js';

import { validateJobRequest, validateUserRequest} from './src/middlewares/validation.middleware.js';
import { auth } from './src/middlewares/auth.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';
import sendMailMiddleware from './src/middlewares/sendMail.middleware.js';

const app = express();

app.use(cookieParser());

app.use(session({
    secret: 'secrectkey',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false},
}))



app.use(express.static('public'));
app.use(express.static('src/views'));

app.set('view engine', 'ejs')
app.set('views', path.join(path.resolve(), 'src', 'views') )

app.use(ejsLayouts)
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());
app.use(express.static('uploads'));
import { fileURLToPath } from 'url';

// Get __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userController = new UserController();
const jobController = new JobController();

// setup routes 
app.get('/', userController.getIndex);
app.get('/all-jobs', jobController.getAllJobsForApplicants)

// user routes
app.get('/register', userController.getRegister);
app.post('/register', userController.postRegister);
app.post('/user-reg',upload.single('file'),userController.postuserRegister);
app.get('/user-reg',userController.getuserRegister);
app.get('/talent-profile',auth,setLastVisit,userController.getTalentProfile)
app.get('/admin-profile',auth,setLastVisit,userController.getAdminProfile)
app.get('/recruiter-profile',auth,setLastVisit,userController.getRecruiterProfile)
app.get('/approve/:id',auth,setLastVisit,userController.getApprove)
app.get('/reject/:id',auth,setLastVisit,userController.getReject)
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/approval', userController.getApproval);

// job routes
app.get('/postjob', auth, jobController.getNewJob);
app.get('/recruiter-jobs/:id', auth, jobController.getJobRec);
app.get('/job-apply/:id', auth, jobController.ApplyJob);

app.post('/postjob', auth, validateJobRequest, jobController.postNewJob);

app.get('/jobs', setLastVisit, auth, jobController.getJobs);
app.get('/job/:id',auth, jobController.getJobById);
app.delete('/delete-job/:id', auth, jobController.deleteJob);
app.get('/job/update/:id', auth, jobController.getUpdateJobView);
app.post('/job/update/:id', auth, validateJobRequest, jobController.postUpdateJob)
app.get('/job/accept/:id/:job', auth,  jobController.acceptJob)
app.get('/job/decline/:id/:job', auth, jobController.declineJob)

app.get('/job/:id/applications/', auth, jobController.getJobApplications);
app.get('/applications/', auth, jobController.getApplications);
app.post('/search', jobController.searchJobs);

// 404 route
app.use((req, res) => {
    res.status(404).render('404', { type: 'Page'});
});

export default app;