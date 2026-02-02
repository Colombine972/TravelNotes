import express from "express";
import notesRouter from "./notes.router.js";

const router = express.Router();


router.use("/api/notes", notesRouter);

export default router;
