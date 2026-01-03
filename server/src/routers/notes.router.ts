import express from "express";
import {getAllNotes, addNote} from "../modules/notes/notes.actions";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", addNote);

export default router;
