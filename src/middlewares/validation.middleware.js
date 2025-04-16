import { body, validationResult } from "express-validator";

const validateUserRequest = async (req, res, next) => {

    const rules = [
        body('name').notEmpty().withMessage('Please provide your name'),
        body('email').isEmail().withMessage('Please provide a valid email address'),
        body('password').notEmpty().withMessage('Password is required')
    ];

    await Promise.all(rules.map(rule => rule.run(req)));
    var validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()) {
        return res.render('register', {
            error: validationErrors.array()[0].msg,
            success: false
        });
    }
    next();
}

const validateJobRequest = async (req, res, next) => {

    let toRender = "";
    if(req.url == '/postjob') {
        toRender = 'new-job';
    } else {
        toRender = 'update-job';
    }

    const rules = [
        body('companyName').notEmpty().withMessage('Please provide Company name'),
        body('location').notEmpty().withMessage('Please provide location'),
        body('salary').notEmpty().withMessage('Please prodvide salary'),
        body('totalPositions').isNumeric({gt: 0}).withMessage('Total positions should be a positive number'),
        body('category').notEmpty().withMessage('Please select category'),
        body('designation').notEmpty().withMessage('Please select designation'),
        body('skills').notEmpty().withMessage('Please select skills'),
    ];

    await Promise.all(rules.map(rule => rule.run(req)));
    var validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()) {
        return res.render( toRender, {
            error: validationErrors.array()[0].msg,
            success: false,
            userId: req.session.userId, 
            userEmail: req.session.userEmail, 
            jobData: req.body
        });
    }
    next();
}

export {
    validateUserRequest,
    validateJobRequest
};