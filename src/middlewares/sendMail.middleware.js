import { createTransport } from "nodemailer";

const createMailOptions = ({ _companyName, _designation, _name, _email }) => {
    return {
        from: process.env.AUTH_USER_MAIL,
        to: _email,
        subject: `Job application for ${_designation} at ${_companyName} is received.`,
        text: `Hi ${_name}, \n \nYour job application for the post of ${_designation} at ${_companyName} has been received.\nOur HR team will get in touch with you soon. \n\nRegards, \nTeam ${_companyName}`,
    };
};

const sendMail = async (mailOptions) => {
    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_USER_MAIL,
            pass: process.env.AUTH_USER_PASS
        }
    });

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    } catch (error) {
        console.log('Email send failed with error: ' + error);
        throw error; // Re-throw the error to be caught in the catch block below
    }
};

const sendMailMiddleware  = async (req, res, next) => {
    
    try {
        const mailOptions = createMailOptions(res.locals);
        await sendMail(mailOptions);

         // Now, render the 'job-details' view after the email is sent
        res.render('job-details', {
            jobData: res.locals.jobData,
            error: null,
            userEmail: req.session.userEmail,
            applicationSubmitted: true,
            formatDate: function (inputDate) {
                const date = new Date(inputDate);
                const options = { day: 'numeric', month: 'short', year: 'numeric' };
                return date.toLocaleDateString('en-GB', options);
            }
        });
    } catch (error) {
        console.log('Email send failed with error: ' + error);
        res.status(500).send('Internal Server Error');    
    }
}
export default sendMailMiddleware;