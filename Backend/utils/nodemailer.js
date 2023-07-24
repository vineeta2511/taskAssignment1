const nodemailer = reaquire('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendMail = async (mailOptions) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', err);
            throw (error);
        } else {
            console.log('Email sent', info.response);
            res.send(info);
        }
    })
}

module.exports = {sendMail}