import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { set } from 'mongoose';
import nodemailer from 'nodemailer'


interface mailType {
    email: string,
    emailType: 'VERIFY' | 'RESET',
    userId: number
}

export const sendEmail = async ({ email, emailType, userId }: mailType) => {

    try {

        const token = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    VerifyToken: token,
                    VerifyTokenExpiry: new Date(Date.now() + 3600000)
                }
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: token,
                    forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
                }
            })
        } else {
            throw new Error('Invalid emailType')
        }


        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: parseInt(process.env.MAIL_PORT || "587"), // Forced conversion to number
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_KEY,
            },
        });

        await transporter.verify();
        console.log("Server is ready to take our messages");


        const path = emailType === 'VERIFY' ? 'verifyemail' : 'changepassword';
        const targetUrl = `${process.env.DOMAIN}/${path}?token=${encodeURIComponent(token)}`;

        const mailOptions = {
            from: 'spectra <spec@dev.io>',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your Account' : 'Reset your password',
            html: `<p>Click <a href="${targetUrl}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${targetUrl}
            </p>`
        }

        const mailRes = await transporter.sendMail(mailOptions)

        return mailRes;

    } catch (error: any) {
        console.error("Email workflow error:", error);
        throw new Error(error.message)
    }

}