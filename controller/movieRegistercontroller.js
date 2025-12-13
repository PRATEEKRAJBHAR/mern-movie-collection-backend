const movieregisterSchema = require('../model/movieRegisterSchema')
const bcrypt = require("bcrypt")
exports.registerRoute = async (req, res) => {
    try {
        const { password, confirm_password, email } = req.body;
        const existingEmail = await movieregisterSchema.findOne({ email })
        if (existingEmail) {
            // console.log("this email id is already exist in our database");
            return res.status(400).json({
                success: false,
                message: "this email id is already exist in our database"
            })
        }
        if (password !== confirm_password) {
            return res.status(400).json({
                success: false,
                message: "password miss-match"
            })
        }

        console.log(req.body);

        // bcrypt hassing password
        const hashpassword = await bcrypt.hash(password, 10)
        req.body.password = hashpassword;
        // req.body.confirm_password=undefined

        const data = await movieregisterSchema.create(req.body);
        console.log(data, "all data");
        res.status(200).json({
            success: true,
            data: data,
            message: "user register successully"
        })
    }
    catch (err) {
        console.error(err);

        res.status(400).json({
            message: "something went wrong",
            success: false

        })
    }
}

