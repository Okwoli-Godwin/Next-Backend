import { google } from "googleapis"
import nodemailer from "nodemailer";
import path from "path"
import ejs from "ejs"

const GOOGLE_ID = "1058807818403-9k1qopfn64mdm7k3abn4vjl39ro9h02u.apps.googleusercontent.com"

const GOOGLE_SECRET = process.env.Secret

const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground"

const REFRESH = "1//04klp50crYb26CgYIARAAGAQSNwF-L9Ir0IiPJ3KbmLGflhaYbn5QwGPDGHB_vQHBgO4iKVjf9-1OIlYUHaaErGBJWt2pkV10G5Y"

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, REFRESH)
oAuth.setCredentials({refresh_token: REFRESH})

export const sendEmail = async (user: any) => {
    try {
        const accessToken: any = await oAuth.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "aclassconsultsenquiry@gmail.com",
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
            from: "aclassconsultsenquiry@gmail.com",
            to: `aclassconsultsenquiry@gmail.com`,
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
