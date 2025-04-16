import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const auth = async(req, res, next) =>{
  const token = req.cookies.token;

  if (!token)    return res.render('login', {
    error: 'unauthorised',
    userEmail: null
});

  jwt.verify(token, 'your_secret_key', async(err, decoded) => {
    if (err) return res.render('login', {
        error: 'unauthorised',
        userEmail: null
    });

   let user = await User.findOne({_id:decoded.userId});
    if (!user) return res.render('login', {
        error: 'unauthorised',
        userEmail: null
    });
    res.cookie('u',user , {
      maxAge: 2*24*60*60*1000
  });
    res.locals.u = req.cookies.u;
  
      req.user = user;
      next();
  });
}

