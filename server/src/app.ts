import express from "express";
import cors from "cors";
import router from "./routers/router.js";
import database from "../database/client.js";

const app = express();

app.use(cors());
app.use(express.json());


app.get("/test-db", async (req, res) => {
  const [rows] = await database.query("SELECT 1 AS ok");
  res.json({
    message: "Connexion à la base OK 🎉",
    rows,
  });
});

app.use(router);

export default app;