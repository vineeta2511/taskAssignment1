const User = require('../../models/userModel');
const randomString = require('randomstring');
const { hashedPassword, comparePassword } = require('../../utils/tokenUtils');
const { generateAccessToken } = require('../../utils/tokenUtils');
const { mailSender } = require('../../utils/nodemailer')


const getUser = async (paginationResults) => {
    try {
        res.json(paginationResults);
    } catch (error) {
        console.log('Error Message in getting User data:', error);
        res.status(500);
        throw new Error(err.message);
    }
};

// const getUsrById = async (req, res) => {
//     try {
//         const user_info = await User.findById(req.params.id)
//         if (!user_info) {
//             res.status(404);
//             throw new Error("User is not found.")
//         }
//         res.status(200).json(user_info)
//     } catch (err) {
//         res.status(500).json({ Message12: "Internal server error" })
//     }
// };

const signupUser = async (username, email, password, role) => {
    if (!username || !email || !password || !role) {
        throw new Error('All fields are required.')
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashedPassword, role });
    if (user) {
        return { _id: user.id, email: user.email, role: user.role };
    } else {
        throw new Error('User not valid')
    }
};

const loginUser = async (email, password) => {

    if (!email || !password) {
        throw new Error('All fields are mandatory!');
    }
    const user = await User.findOne({ email });

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
    return { accessToken };
}


const logoutUser = (req, res) => {
    res.clearCookie('access_token', { httpOnly: true, secure: true });
    res.status(200).json({ Message: 'Logged out successfully' });
}

const updatePassword = async (email, password, newPassword) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error('Current password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ Message: 'Password updated successfully' });



    const generateOtp = async (email) => {
        try {
        if (!email) {
            rror: 'Email is mandatory!'
        };

        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }

        const otp = randomString.generate({ length: 4, type: 'numeric' });

        user.resetOtp = otp;
        user.resetOtpExpiration = Date.now() + 600000; //10 min in milliseconds
        await user.save();

        const mailOptions = {
            from: 'vvineeta2511@gmail.com',
            to: user.email,
            subject: 'Reset Password OTP',
            text: `Your OTP to reset the password is: ${otp}.
            It is valid for 5 min only`,
        };
       await mailSender.sendMail(mailOptions);
            console.log('OPT email sent succesfully.');
        } catch (error) {
            console.log('Error sending OTP email:', err);
            throw new Error('Fialed to send OTP');
        }
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
        res.status(500).json({ Message2: 'Internal server error' });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user_info = await User.findById(req.params.id)
        if (!user_info) {
            res.status(404);
            throw new Error("User is not found.")
        }
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ Message: 'User deleted successfully.' })
    } catch (err) {
        console.error(err);
        res.status(500).json({ Message3: 'Internal server error.' });
    }
}

module.exports = {
    getUser,
    signupUser,
    loginUser,
    updatePassword,
    logoutUser,
    resetPassword,
    updateUser,
    deleteUser
}