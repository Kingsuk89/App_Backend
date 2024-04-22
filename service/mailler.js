import nodemailer from "nodemailer";
import "dotenv/config";
import { otpTempted } from "../utils/OtpTemplate.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  from: process.env.EMAIL,
});

export async function SendMail({ otp, userEmail, name, condition, subject }) {
  const info = await transporter.sendMail({
    from: '"Book store" <maddison53@ethereal.email>', // sender address
    to: userEmail, // list of receivers
    subject: subject, // Subject line
    html: otpTempted(otp, name, condition), // html body
  });
}
