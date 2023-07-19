const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randomString = require('randomstring');
const dotenv = require('dotenv');
dotenv.config();


const getUser = async (req, res) => {
    const user_info = await User.find();

    res.status(200).json(user_info)
};

const getUsrById = async (req, res) => {
    const user_info = await User.findById(req.params.id)
    if (!user_info) {
        res.status(404)
        throw new Error("User is not found")
    }
    res.status(200).json(user_info)
};

const signupUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password || !role) {
            res.status(400);
            throw new Error('All fields are required.')
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ Message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword, role });
        if (user) {
            res.status(201).json({ _id: user.id, email: user.email, role: user.role });
        } else {
            res.status(400);
            throw new Error('User not valid')
        }
        // res.json({ Message: "SignUp successfully." })

    } catch (err) {
        console.log(err)
        res.status(500).json({ errorMessage: 'Failed to SignUp.' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        //console.log("password", password)

        if (!email || !password) {
            res.status(400).json({ error1: 'All fields are mandatory!' });
        }

        const user = await User.findOne({ email });
        //console.log("user",user.email);
        if (!user) {
            res.status(401).json({ error2: 'Email or password is not valid' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(401).json({ error3: 'Email or password is not valid' })
        }

        const accessToken = jwt.sign(
            {
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role
                },
            },
            process.env.SECRET_KEY, { expiresIn: '1h' });
        res.cookie('access_token', accessToken, {
            maxAge: 300000, // 5min
            httpOnly: true,
            secure: true,
        });

        res.status(200).json({ accessToken: accessToken });

    } catch (err) {
        console.log(err);
        res.status(500).json({ Error4: 'Failed to authenticate user' });
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('access_token', { httpOnly: true, secure: true });
    res.status(200).json({ Message: 'Logged out successfully' });
}

const updatePassword = async (req, res) => {
    try {
        const { email, password, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(401).json({ error: 'Current password is incorrect' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ Message: 'Password updated successfully' });

    } catch (err) {
        console.log("error", err)
        res.status(500).json({ Message: 'Failed to update password' });
    }
}
const generateOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            res.status(400).json({ error: 'Email is mandatory!' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }

        const otp = randomString.generate({ length: 4, type: 'numeric' });

        user.resetOtp = otp;
        user.resetOtpExpiration = Date.now() + 600000; //10 min in milliseconds
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'vvineeta2511@gmail.com',
                pass: 'noprolhinjlueqwb',
            },
        });
        const mailOptions = {
            from: 'vvineeta2511@gmail.com',
            to: user.email,
            subject: 'Reset Password OTP',
            text: `Your OTP to reset the password is: ${otp}.
            It is valid for 5 min only`,
        };
        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ Message: 'Error sending OTP' });
            }

            res.status(200).json({ Message: 'OTP sent successfully' });
        });

    } catch (err) {
        console.error("err", err);
        res.status(500).json({ Message: 'Failed to generate OTP' });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.resetOtp !== otp || Date.now() > user.resetOtpExpiration) {

            res.status(401).json({ error: 'Invalid or expired OTP' });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedNewPassword;

        user.resetOtp = null;
        user.resetOtpExpiration = null;
        await user.save();
        res.status(200).json({ Message: 'Password reset successfully.' })
    } catch (err) {
        res.status(500).json({ Message: 'Failed to reset password' });
    }
}

const updateUser = async (req, res) => {
    try {
        const user_info = await User.findById(req.params.id)
        if (!user_info) {
            res.status(404)
            throw new Error("User is not found")
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.status(200).json({ Message: 'User updated Successfully' })
    } catch (err) {
        console.error(err);
        res.status(500).json({ Message: 'Internal server error' });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user_info = await User.findById(req.params.id)
        if (!user_info) {
            res.status(404)
            throw new Error("User is not found")
        }
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ Message: 'User deleted successfully' })
    } catch (err) {
        console.error(err);
        res.status(500).json({ Message: 'Internal server error' });
    }
}

// const currentUser = async (req, res) => {
//    try{
//     res.json(req.user.accessToken); 
//    }
//    catch(err){
//     res.status(500).json({Message: 'Internal server error'})
//    }
// }

module.exports = { getUser, getUsrById, generateOtp, resetPassword, updatePassword, signupUser, loginUser, logoutUser, updateUser, deleteUser };
