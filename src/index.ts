import express, { Application, Request, Response } from "express"
import { dbconnection } from "./Config/db"
import { appConfig } from "./app"
import { enviromentvariables } from "./Enviromentvariables/enviromentvariables"

const app: Application = express()

appConfig(app)
dbconnection()

app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
        message: "API READY FOR NEXT APP"
    })
});

app.listen(enviromentvariables.PORT, () => {
    console.log("Server is up and running", enviromentvariables.PORT)
})