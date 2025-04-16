import moment from "moment";

export const setLastVisit = (req, res, next) => {
    
    // If cookie is set, then add a locals variable with last visit time data
    if(req.cookies.lastVisit) {
        res.locals.lastVisit = moment(req.cookies.lastVisit, 'DD MMM YYYY hh:mm A').format('DD MMM YYYY hh:mm A');
    }
    res.cookie('lastVisit', moment().format('DD MMM YYYY hh:mm A'), {
        maxAge: 2*24*60*60*1000
    });
    next();
}
