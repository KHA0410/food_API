import express from "express";
import rootRouter from "./src/routes/rootRouter.js";
import cors from "cors";

const app = express();

app.listen(8000);
app.use(express.json());
app.use(cors());

app.use(rootRouter);
