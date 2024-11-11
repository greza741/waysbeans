import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import router from "./router/index-route";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
