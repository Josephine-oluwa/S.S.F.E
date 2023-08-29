import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { HTTP, mainError } from "./Error/mainError";
import { errorHandler } from "./Error/ErrorHandler";


export const mainApp = (app: Application) => {
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    }),
  );

  app.get("/", (req: Request, res: Response) => {
    res.status(HTTP.OK).json({
      message: "Awesome Code~~",
    });
  });

 app.use("/api/v1");

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(
      new mainError({
        name: "Router Error",
        message: `This Error is coming up because the ${req.originalUrl} URL, isn't correct!!!`,
        status: HTTP.BAD_REQUEST,
        success: false,
      }),
    );
  });

  app.use(errorHandler);
};
