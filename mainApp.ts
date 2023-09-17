import express, { Application, Request, Response } from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import auth from "./Router/AuthRouter"


export const mainApp = (app: Application)=> {
  app.use(cors());
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(express.json());

  app.set("view engine", "ejs")

  app.use("/api", auth)

  app.get("/", async (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: "This is the test...."
      })
    } catch (error) {
      return res.status(404).json({
        message: "Error",
        data: error
      })
    }
  })

}