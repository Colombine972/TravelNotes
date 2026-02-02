import express from "express";
import {getAllNotes, addNote, getNotById} from "../modules/notes/notes.actions.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", addNote);
router.get("/:id", getNotById);

export default router;
