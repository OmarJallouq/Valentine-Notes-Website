const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, //TODO: create email for valentines team
            pass: process.env.EMAIL_PASS
        },
    });

    const verificationLink = (process.env.NODE_ENV == "production" ? `${process.env.FRONTEND_URL}` : `localhost:3000`) + `/verify?token=${token}`;

    await transporter.sendMail({
        from: '"BAI Valentine’s Team" <noreply@baivalentines.com',
        to: email,
        subject: "Verify Your Account",
        html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    });
};

module.exports = sendVerificationEmail;