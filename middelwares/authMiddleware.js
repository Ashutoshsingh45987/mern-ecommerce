import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';


// validate token and protected routes
export const requireSignIn = async (req,res,next)=>{
    try {
        const decode = await JWT.verify(req.headers.authorization,process.env.JWT_SECRET);         // token header me rehta hai

        req.user = decode;               // this is important step
        next();
    } catch (error) {
        console.log(error);
    }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);
      if (user.role !== 1) {
        return res.status(402).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };