const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

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
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            res.status(400);
            throw new Error('All fields are required.')
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        console.log(email, password, role)
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: 'Signup successfully' });
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
            res.status(400).json({ error: 'All fields are mandatory!' });
        }

        const user = await User.findOne({ email });

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (user && passwordMatch) {
            const accessToken = jwt.sign(
                {
                    user: {
                        email: user.email,
                        id: user.id
                    },
                }, 'secretKey', { expiresIn: '1m' });
            res.status(200).json({ accessToken });
        }
        else {
            res.status(401).json({ error: "Email or password is not valid" })
        }


    } catch (err) {
        res.status(500).json({ error: 'Failed to authenticate user' });
    }
}
  

module.exports = { getUser, getUsrById, signupUser, loginUser };
