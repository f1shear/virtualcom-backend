import express from "express";
import * as bodyParser from "body-parser";
import { listPhones, registerNumber } from "./models/phone";
import {
  listConnections,
  createConnection,
  getConnection,
  isAction,
  updateConnection,
} from "./models/connection";

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

app.get("/connections", (_req, res) => {
  res.send(listConnections());
});

app.post("/connections", (req, res) => {
  const { callee, caller } = req.body;
  const connection = createConnection(
    parseInt(callee, 10),
    parseInt(caller, 10)
  );
  res.send(connection);
});

app.get(`/connections/:connectionId/`, (req, res) => {
  const { connectionId } = req.params;
  const connection = getConnection(parseInt(connectionId, 10));
  res.send(connection);
});

app.post(`/connections/:connectionId/:action`, (req, res) => {
  const { connectionId, action } = req.params;
  if (!isAction(action)) throw new Error(`Unknown action: ${action}`);
  const connection = updateConnection(parseInt(connectionId, 10), action);
  res.send(connection);
});

app.listen(app.get("port"), () => {
  console.log(
    "App is running on http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
});
