import formprofile from "../Model/Appmodel"
import { Request, Response } from "express"
import { sendEmail } from "../Utils/Email"

export const Message = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {
            firstName,
            lastName,
            email,
            number,
            location,
            inquiry,
            message
        } = req.body;

        const createData = await formprofile.create({
            firstName,
            lastName,
            email,
            number,
            location,
            inquiry,
            message
        })

        sendEmail(createData);

        return res.status(200).json({
            message: "check your email for verification",
            data: {createData}
        })
    } catch (error: any) {
        return res.status(400).json({
            message: "failed to send email",
            data: error.message
        })
    }
}