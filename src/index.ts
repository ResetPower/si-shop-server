import cors from "cors";
import express from "express";
import https from "https";
import { existsSync, readFileSync, writeFileSync } from "fs";

const invoicesFile = "./data/invoices.json";

console.log("Hello, World!");
const invoices = existsSync(invoicesFile)
  ? JSON.parse(readFileSync(invoicesFile).toString())
  : [];

function saveChanges() {
  writeFileSync(invoicesFile, JSON.stringify(invoices));
}

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.post("/invoice", (req, res) => {
  const inv = req.body;
  if (!inv) {
    res.status(500);
    return;
  }
  invoices.push(inv);
  saveChanges();
  res.send(
    JSON.stringify({ textMessage: `Received Invoice#${inv.id ?? "ID"}!` })
  );
});
app.listen(2954);

if (process.env.NODE_ENV === "production") {
  var privateKey = readFileSync("./cert/private.key");
  var certificate = readFileSync("./cert/certificate.crt");

  https
    .createServer(
      {
        key: privateKey,
        cert: certificate,
      },
      app
    )
    .listen(443);
}
