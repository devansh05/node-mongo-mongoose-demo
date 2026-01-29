import "dotenv/config";
import express from "express";
import { connectMongoDB } from "./db/connection.js";
import { userRouter } from "./routes/user-routes.js";
import { errorHandler } from "./middleware/error-handler.js";

const PORT = 3000;

const app = express();

app.use(express.json());

app.use("/users", userRouter);

app.use(errorHandler);

connectMongoDB(process.env.MONGO_DB_URL).then(() =>
  console.log(`🟡 LOG - : Connected to Mongo`),
);

app.listen(PORT, () => console.log(`🟡 LOG - : LISTENING ON `, PORT));
