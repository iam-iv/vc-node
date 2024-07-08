import express, { Request, Response } from "express";
import authRouter from "./routes/auth.router";

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome");
});

app.use((req: Request, response: Response) => {
  response.status(404).send("<h1>Path Not Found</h1>");
});

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
