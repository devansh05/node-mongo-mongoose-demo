import "dotenv/config";
import express from "express";
import { connectMongoDB } from "./connection.js";

const PORT = 3000;

const app = express();

connectMongoDB(process.env.MONGO_DB_URL).then(() =>
  console.log(`🟡 LOG - : Connected to Mongo`),
);

app.listen(PORT, () => console.log(`🟡 LOG - : LISTENING ON `, PORT));
