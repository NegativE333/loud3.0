import nodemailer from 'nodemailer';

const email = process.env.EMAIL;
const pass = process.env.PASSWORD;

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass,
    }
});

export const mailOptions = {
    from: email,
}