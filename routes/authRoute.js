import express from "express";
import {loginController, registerController, testController} from '../controllers/authController.js';
import {isAdmin, requireSignIn} from '../middelwares/authMiddleware.js'

// router objexct
const router= express.Router();


// routing
// reigister || method: Post
router.post('/register', registerController);

// login ||  method :Post
router.post('/login',loginController);

// test routes

router.get('/test',requireSignIn,isAdmin,testController);


export default  router;