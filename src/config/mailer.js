import dotenv from 'dotenv';
dotenv.config();
import { createTransport } from "nodemailer";

const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (toEmail, appointmentDate) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Appointment Reminder',
        text: `This is a reminder that you have an appointment scheduled on ${appointmentDate}.`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export const sendConfirmationEmail = async (toEmail, name, appointmentDate) => {
    try {
        const info = await transporter.sendMail({
            from: `"Your Company" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: 'Appointment Confirmation',
            html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for booking your appointment with us.</p>
        <p><strong>Appointment Date:</strong> ${appointmentDate}</p>
        <p>We look forward to seeing you!</p>
      `
        });

        console.log('Email sent: ', info.messageId);
    } catch (error) {
        console.error('Email sending failed:', error);
    }
};
