"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const GOOGLE_ID = "1058807818403-9k1qopfn64mdm7k3abn4vjl39ro9h02u.apps.googleusercontent.com";
const GOOGLE_SECRET = process.env.Secret;
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";
const REFRESH = "1//04klp50crYb26CgYIARAAGAQSNwF-L9Ir0IiPJ3KbmLGflhaYbn5QwGPDGHB_vQHBgO4iKVjf9-1OIlYUHaaErGBJWt2pkV10G5Y";
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, REFRESH);
oAuth.setCredentials({ refresh_token: REFRESH });
const sendEmail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "aclassconsultsenquiry@gmail.com",
                type: "OAuth2",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                accessToken: accessToken.token
            }
        });
        const getData = path_1.default.join(__dirname, "../views/Emaildetails.ejs");
        const readData = yield ejs_1.default.renderFile(getData, {
            firstName: user === null || user === void 0 ? void 0 : user.firstName,
            lastName: user === null || user === void 0 ? void 0 : user.lastName,
            email: user === null || user === void 0 ? void 0 : user.email,
            number: user === null || user === void 0 ? void 0 : user.number,
            location: user === null || user === void 0 ? void 0 : user.location,
            inquiry: user === null || user === void 0 ? void 0 : user.inquiry,
            message: user === null || user === void 0 ? void 0 : user.message,
            id: user === null || user === void 0 ? void 0 : user._id
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
            console.log("Email sent!");
        })
            .catch((err) => {
            throw err;
        });
    }
    catch (error) {
        throw error;
    }
});
exports.sendEmail = sendEmail;
