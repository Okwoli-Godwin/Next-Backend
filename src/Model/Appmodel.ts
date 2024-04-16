import mongoose from "mongoose";

interface appschema{
    firstName: string;
    LastName: string;
    email: string;
    number: number;
    location: string;
    inquiry: string;
    message: string
}

interface dataschema extends appschema, mongoose.Document{ }

const data = new mongoose.Schema(
    {
        firstName: {
            type: String, 
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        number: {
            type: Number,
        },
        location: {
            type: String,
        },
        inquiry: {
            type: String,
           required: true 
        },
        message: {
            type: String,
            required: true
        }
    }
)

const formprofile = mongoose.model<dataschema>("appschema", data)

export default formprofile