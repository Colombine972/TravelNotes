import express from "express";
import notesRouter from "./notes.router";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("🔥 ROUTER OK 🔥");
});

router.use("/api/notes", notesRouter);


export default router;

