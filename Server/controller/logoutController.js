import { cookieClear } from "../util/cookieSection.js"

const logout = async(req, res) => {
    try {
        cookieClear(res);

        return res.json({success: true, message: "Successfully Logged Out"});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

export default logout;