import express from "express";
import {forgotPasswordController, loginController, registerController, testController} from '../controllers/authController.js';
import {isAdmin, requireSignIn} from '../middelwares/authMiddleware.js'
import { get } from "mongoose";

// router objexct
const router= express.Router();


// routing
// reigister || method: Post
router.post('/register', registerController);

// login ||  method :Post
router.post('/login',loginController);


// forgot password || method:Post
router.post ('/forgot-password',forgotPasswordController)

// test routes

router.get('/test',requireSignIn,isAdmin,testController);

// protected User routes auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})

// protected admin Route auth
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})


export default  router;