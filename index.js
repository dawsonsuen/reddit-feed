import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import * as controller from "./controller.js";
import bodyParser from "body-parser";

const app = express();
export const port = process.env.PORT || 3000;
export const host = process.env.HOST || 'localhost';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/subscriptions", (req, res) => {
  controller.subscriptions(req, res);
});

app.post("/subscribe", (req, res) => {
  controller.subscribe(req, res);
});

app.delete("/subscribe/:channelName", (req, res) => {
  controller.unSubscribe(req, res);
});

// static files
app.use(express.static(path.join(__dirname, "./client")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at ${host}:${port}`);
});
