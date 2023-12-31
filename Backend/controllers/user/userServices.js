const User = require("../../models/userModel");
const randomString = require("randomstring");
const { hashPassword, comparePassword } = require("../../utils/passwordUtils");
const { generateAccessToken } = require('../../utils/tokenUtils');
const { sendMail } = require("../../utils/nodemailer");
//const paginatedResults = require('../../middlewares/pagination')

const getUser = async () => {
  try {
    const users = await User.find();
    console.log(users)
    return users;
  } catch (error) {
    console.log("Error Message in getting User data:", error);
    throw new Error(err.message);
  }
};

//const getPaginatedUsers = async(){

// };

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

const signupUser = async (userData) => {
  try {
    const { username, email, password, role } = userData;
    if (!username || !email || !password || !role) {
      throw new Error("All fields are required.");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    if (user) {
      return { _id: user.id, email: user.email, role: user.role };
    } else {
      throw new Error("User not valid");
    }
  } catch (error) {
    console.error("Error");
  }
};

const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Email or password is not valid");
  }

  const passwordMatch = await comparePassword(password, user.password);

  if (!passwordMatch) {
    throw new Error("Email or password is not valid");
  }

  return user;
};

const updatePassword = async ({ email, password, newPassword }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const passwordMatch = await comparePassword(password, user.password);

  if (!passwordMatch) {
    throw new Error("Current password is incorrect");
  }

  const hashedNewPassword = await hashPassword(newPassword, 10);
  user.password = hashedNewPassword;
  await user.save();
};

const generateOtp = async (email) => {
  try {
    if (!email) {
      throw new Error("Email is mandatory!");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Email does not exist.");
    }

    const otp = randomString.generate({ length: 4, type: "numeric" });

    user.resetOtp = otp;
    user.resetOtpExpiration = Date.now() + 600000; //10 min in milliseconds
    await user.save();

    const mailOptions = {
      from: "vvineeta2511@gmail.com",
      to: user.email,
      subject: "Reset Password OTP",
      text: `Your OTP to reset the password is: ${otp}.
                It is valid for 5 min only.`,
    };
    await sendMail(mailOptions);
    console.log("OPT email sent succesfully.");
    return { Message: "OPT email sent succesfully." };
  } catch (error) {
    console.log("Error sending OTP email:", error);
    throw new Error("Failed to send OTP");
  }
};

const resetPassword = async ({ email, otp, newPassword }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }
  if (user.resetOtp !== otp || Date.now() > user.resetOtpExpiration) {
    throw new Errro("Invalid or expired OTP");
  }

  const hashedNewPassword = await hashPassword(newPassword, 10);
  user.password = hashedNewPassword;
  user.resetOtp = null;
  user.resetOtpExpiration = null;
  await user.save();
};

const updateUser = async (id, updateData) => {
  try {
    const user_info = await User.findById(id);
    if (!user_info) {
      throw new Error("User is not found.");
    }
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return updatedUser;
  } catch (err) {
    console.error(err);
    res.status(500).json({ Message2: "Internal server error" });
  }
};

const deleteUser = async (id) => {
  try {
    const user_info = await User.findById(id);
    if (!user_info) {
      throw new Error("User is not found.");
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ Message: "User deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Message3: "Internal server error." });
  }
};

module.exports = {
  getUser,

  signupUser,
  loginUser,
  generateOtp,
  updatePassword,
  resetPassword,
  updateUser,
  deleteUser,
};
