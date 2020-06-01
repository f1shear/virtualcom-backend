import express from "express";
import * as bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.set("port", process.env.PORT || 3000);

app.get("/", (_req, res) => {
  res.send({ message: "Virtualcom backend" });
});

app.listen(app.get("port"), () => {
  console.log(
    "App is running on http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
});
