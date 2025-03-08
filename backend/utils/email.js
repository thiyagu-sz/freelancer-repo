import nodemailer from 'nodemailer';

// ✅ Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    host: process.env.HOSTINGER_SMTP_HOST,
    port: parseInt(process.env.HOSTINGER_SMTP_PORT), // Ensure it's a number
    secure: false, // Must be false for port 587
    auth: {
        user: process.env.HOSTINGER_EMAIL,
        pass: process.env.HOSTINGER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false // Allow self-signed certificates
    }
});

// ✅ Updated Send Email Function to Support HTML
const sendEmail = async (to, subject, htmlContent) => {
    try {
        const mailOptions = {
            from: `"InnovationMate" <${process.env.HOSTINGER_EMAIL}>`, // ✅ Professional sender
            to,
            subject,
            html: htmlContent // ✅ Ensure email is sent as HTML
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent:", info.response);
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error("❌ Email sending failed:", error.message);
        return { success: false, message: error.message };
    }
};

export default sendEmail;
