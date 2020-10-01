import express, { Application, Request, Response, NextFunction } from "express";

const port: number = 5000;
const app: Application = express();

const connectDatabase = require("./config/db");
connectDatabase();

// Express Json
app.use(express.json());

// Routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

app.listen(port, () => console.log(`Server running on port ${port}`));
