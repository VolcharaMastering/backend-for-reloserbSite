import nodemailer from 'nodemailer';
require('dotenv').config();

const { FORM_FROM_EMAIL, FORM_FROM_EMAIL_PASSWORD } = process.env as { 
    FORM_FROM_EMAIL: string;
    FORM_FROM_EMAIL_PASSWORD: string;
};
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: FORM_FROM_EMAIL,
        pass: FORM_FROM_EMAIL_PASSWORD,
    },
    secure: true,
    requireTLS: true,
});

export default transporter;

