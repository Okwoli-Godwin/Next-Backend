import express from "express"
import {Message} from "../Controller/Controller"

const router = express.Router();

router.post("/postmessage", Message)

export default router