import express from "express";
import { allUsers } from "./db/connectDb";

const app = express();

const port = process.env.PORT || 3000;
console.log(allUsers);

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
