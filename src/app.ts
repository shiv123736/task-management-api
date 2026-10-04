import express, { Request, Response } from "express";
import taskRouter from "./routes/task.route";
import { authRouter } from "./routes/auth.route";
import errorHandler from "./middleware/error.middleware";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/v1", taskRouter);
app.use("/api/v1/auth", authRouter);
app.use(errorHandler);



export default app;
