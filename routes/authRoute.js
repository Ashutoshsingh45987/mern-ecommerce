import express from "express";
import {loginController, registerController} from '../controllers/authController.js'

// router objexct
const router= express.Router();


// routing
// reigister || method: Post
router.post('/register', registerController);

// login ||  method :Post
router.post('/login',loginController);


export default  router;