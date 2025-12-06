import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { cookieGenerator } from '../util/cookieSection.js';

const login = async(req, res) => {
    const{email, password} = req.body;

    if(!email || !password){
        return res.json({success: false, message: "All the Field are require!"});
    }

    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success: false, message: "User not Exist!"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({success: false, message: "Invalid Password!"});
        }

        cookieGenerator(res, user);

        return res.json({success: true});

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

export default login;