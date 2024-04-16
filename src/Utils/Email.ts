import { google } from "googleapis"
import nodemailer from "nodemailer";
import path from "path"
import ejs from "ejs"

const GOOGLE_ID = "488830189846-m4ue8mg86ph5mt1o36gjaa91q2bb4tt3.apps.googleusercontent.com"

const GOOGLE_SECRET = process.env.Secret

const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground"

const REFRESH = "1//04tym4OekBI6cCgYIARAAGAQSNwF-L9Irg7GZxXmxvCuyAvJadZXlDA6sCPhTTpBGs6ztBGngSrmp1XwQhTY9fEevr4a0tOFQOCY"

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, REFRESH)
oAuth.setCredentials({refresh_token: REFRESH})

export const sendEmail = async (user: any) => {
    try {
        const accessToken: any = await oAuth.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "okwolig60@gmail.com",
                type: "OAuth2",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                accessToken: accessToken.token
            }
        });

        const getData = path.join(__dirname, "../views/Emaildetails.ejs");

        const readData = await ejs.renderFile(getData, {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            number: user?.number,
            location: user?.location,
            inquiry: user?.inquiry,
            message: user?.message,
            id: user?._id
        });

        let mailerOptions = {
            from: "okwolig60@gmail.com",
            to: `okwolig60@gmail.com`,
            subject: "Contact Form",
            html: readData
        };

        transporter
            .sendMail(mailerOptions)
            .then(() => {
            console.log("Email sent!")
        })
        .catch((err) => {
            throw err;
        })
    } catch (error) {
        throw error;
    }
}
