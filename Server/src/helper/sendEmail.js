import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import dotenv from 'dotenv'

dotenv.config()

const OAuth2Client = new google.auth.OAuth2(
    process.env.EMAIL_CLIENT_ID,
    process.env.EMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);

// Set refresh token
OAuth2Client.setCredentials({ refresh_token: process.env.EMAIL_REFRESH_TOKEN });

const sendEmail = async (userEmail, resetLink) => {
    try {
        const accessToken = await OAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL_USER,
                clientId: process.env.EMAIL_CLIENT_ID,
                clientSecret: process.env.EMAIL_CLIENT_SECRET,
                refreshToken: process.env.EMAIL_REFRESH_TOKEN,
                accessToken: accessToken.token, // Generated dynamically
            },
        });

        const mailOptions = {
            from: `Your Name <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: "Password Reset Request",
            html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; background: #fff; padding: 20px; margin: auto; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #333;">Password Reset Request</h2>
                    <p style="color: #555; line-height: 1.6;">Hello,</p>
                    <p style="color: #555; line-height: 1.6;">We received a request to reset your password. Click the button below to proceed with resetting your password.</p>
                    <p>
                        <a href="${resetLink}" style="display: inline-block; background: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                            Reset Password
                        </a>
                    </p>
                    <p style="color: #555; line-height: 1.6;">If you did not request this, you can safely ignore this email. This link will expire in **15 minutes**.</p>
                    <p style="color: #555; line-height: 1.6;">For security reasons, do not share this link with anyone.</p>
                    <p style="margin-top: 20px; font-size: 12px; color: #777;">If you need any help, contact our support team.</p>
                </div>
            </div>
        `,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent:", result);
        return result;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

export { sendEmail }
