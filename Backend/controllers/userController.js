const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
            return res.status(409).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword, role });
        if (user) {
            res.status(201).json({ _id: user.id, email: user.email, role: user.role });
        } else {
            res.status(400);
            throw new Error('User not valid')
        }
        res.json({ message: "SignUp successfully." })

    } catch (err) {
        console.log(err)
        res.status(500).json({ errorMessage: 'Failed to SignUp.' });
    }
};

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        console.log("password", password)

        if (!email || !password) {
            res.status(400).json({ error1: 'All fields are mandatory!' });
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
        res.status(200).json({ accessToken: accessToken });
        console.log("Token:", accessToken);
    } catch (err) {
        res.status(500).json({ Error4: 'Failed to authenticate user' });
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
        res.status(200).json({ message: 'User updated Successfully' })
    } catch (error) {

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
        res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { getUser, getUsrById, signupUser, loginUser, updateUser, deleteUser };
