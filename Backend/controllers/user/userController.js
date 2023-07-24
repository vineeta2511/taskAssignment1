const dotenv = require('dotenv');
dotenv.config();

const { getUser,
    getPaginatedUsers,
    signupUser,
    loginUser,
    generateOtp,
    updatePassword,
    resetPassword,
    updateUser,
    deleteUser } = require("./userServices");
const { generateAccessToken } = require('../../utils/tokenUtils');

const getUserController = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            return getPaginatedUsers(req, res, () => {
                res.json(res.getPaginatedResults);
            })
        }
        else {
            const users = await getUser();
            res.json({ users })
        }
    } catch (error) {
        console.log('Error Message in getting User data:', err);
        res.status(500);
        res.json({ error: err.message });
    }
}

const signupUserController = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const user = await signupUser({ username, email, password: hashedPassword, role });
        res.status(201).json({ _id: user._id, email: user.email, role: user.role })
    }
    catch (error) {
        console.log('Error in SignUp process', error);
        res.status(500).json({ errorMessage: 'Failed to SignUp.' });
    }
};
  
const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser({ email, password });
        const accessToken = generateAccessToken({
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            }
        })
        res.status(200).json({ accessToken: accessToken });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'Failed to Login.' })
    }
}

const logoutUserController = (req, res) => {
    res.clearCookie('access_token', { httpOnly: true, secure: true });
    res.status(200).json({ Message: 'Logged out successfully' });
}

const updatePasswordController = async (req, res) => {
    try {
        const { email, password, newPassword } = req.body;
        await updatePassword({ email, password, newPassword });
        res.status(200).json({ Message: 'Password updated succesfully.' })
    }
    catch (error) {
        console.error('Error in Updating password:', error);
        res.status(500).json({ Message: 'Failed to update password.' })
    }
};

const generateOtpContoller = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await generateOtp(email);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error generate OTP:', error);
        res.status(500).json({ Message: 'Failed to generate OTP' })
    }
}

const resetPasswordController = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        await resetPassword({ email, otp, newPassword });
        res.status(200).json({ Message: 'Password reset successfully.' })
    } catch (error) {
        res.status(500).json({ Mesaage: 'Failed to reset password.' })
    }
};

const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await updateUser(id, req.body);
        res.status(200).json({ Message: 'User updated Successfully', user: updatedUser })
    } catch (error) {
        console.error(error);
        res.status(500).json({ Message: 'Internal server error.' })
    }
};

const deleteUseContoller = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteUser(id);
        res.status(200).json({ Message: 'User deleted Successfully.' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ Message: 'Internal sever errro.' })
    }
};

module.exports = {
    getUserController,
    signupUserController,
    loginUserController,
    logoutUserController,
    updatePasswordController,
    resetPasswordController,
    generateOtpContoller,
    updateUserController,
    deleteUseContoller
};
