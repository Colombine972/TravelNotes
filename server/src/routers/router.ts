import express from "express";
import notesRouter from "./notes.router.js";
import userRouter from "./user.router.js";

const router = express.Router();


router.use("/api/notes", notesRouter);
router.use("/api/users", userRouter);

export default router;
