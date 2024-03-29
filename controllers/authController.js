import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';

 
 
export const registerController = async  (req, res)=>{
    try {
        const {name,email,password,phone,address,answer}=req.body
        // validations 
        if(!name){
            return res.send({message:'Name is required'});
        }
        if(!email){
            return res.send({message:'email  is required'});
        }
        if(!password){
            return res.send({message:'password is required'});
        }
        if(!phone){
            return res.send({message:'phone is required'});
        }
        if(!address){
            return res.send({message:'address is required'});
        }
        if(!answer){
            return res.send({message:'answer is required'});
        }
        // check user
        const existingUser= await userModel.findOne({email});
        // existing user
        if(existingUser){
            return res.status(200).send(
                {
                    success:true,
                    message:'Already Register please login ',
                }
            )
        }
        // register user
        const hashedPassword =await hashPassword(password);
        // save 
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer,
            
          }).save();

          res.status(201).send({
                success:true,
                message:'User register Successfully',
                user
          })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in registration',
            error
        })
    }
}

// loginController

export  const  loginController =async (req,res)=>{
    try {
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(404).send({                              // validation step wise sare main steps ki hoti hai
                success:false,
                message:'Invalid email or Password'
            })
        }

        //  check user
        const user= await userModel.findOne({email});
        if(!user){                                                   // validatino of check user
            return  res.status(404).send({
                success:false,
                message:'Email is not Registerd'
            })
        }

        // compare
        const match= await comparePassword(password,user.password);
        if(!match){                                                     // check if match is there or not
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }

        // token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d",});
        res.status(200).send({
            success:true,
            message:'login successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
            },
            token,
        })


        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Login',
            error
        })
    }
}

// forgot password controller
export const forgotPasswordController= async (req,res)=>{
    try {
        const[email,answer,newPassword]=req.body;
        if(!email){
            res.status(400).send({message:'Email is required'});
        }
        if(!answer){
            res.status(400).send({message:'Answer is required'});
        }
        if(!newPassword){
            res.status(400).send({message:'NewPassword is required'});
        }

        // chech
        const user = await userModel.findOne({email,answer});

        if(!user){
            return res.status(404).send({                                   // validatino of user
                success:false,
                message:'wrong email or answer'
            })
        }

        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success:true,
            message:'Password reset successfully'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went wrong",
            error
        })
    }

}

//update prfole
export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };


// test controller

export const testController= (req,res)=>{
    res.send("Protected route")
}