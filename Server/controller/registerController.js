import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { cookieGenerator } from '../util/cookieSection.js';


const register = async(req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.json({success: false, message: "All the field are require!"});
    }

    try{
        const emailExist = await userModel.findOne({email});

        if(emailExist){
            return res.json({success: false, message: "Email already exist!"});
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const user = new userModel({name, email, password: hashedpassword});

        await user.save();

        cookieGenerator(res, user);

        return res.json({success: true});

    }catch(error){
        return res.json({success: false, message: error.message});
    }
}

export default register;