import cors from "cors";
import express from "express";
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
