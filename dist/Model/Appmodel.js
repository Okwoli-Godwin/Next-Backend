"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const data = new mongoose_1.default.Schema({
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
});
const formprofile = mongoose_1.default.model("appschema", data);
exports.default = formprofile;
