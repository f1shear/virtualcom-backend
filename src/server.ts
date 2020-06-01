import express from "express";
import * as bodyParser from "body-parser";
import { listPhones, registerNumber } from "./models/phone";

const app = express();
app.use(bodyParser.json());

app.set("port", process.env.PORT || 3000);

app.get("/", (_req, res) => {
  res.send({ message: "Virtualcom backend" });
});

app.get("/phones", (_req, res) => {
  res.send(listPhones());
});

app.post("/phones", (_req, res) => {
  const phone = registerNumber();
  res.send(JSON.stringify({ phone }));
});

app.listen(app.get("port"), () => {
  console.log(
    "App is running on http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
});
