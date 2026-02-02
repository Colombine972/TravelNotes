import express from "express";
import notesActions from "../modules/notes/notesActions.js";


const router = express.Router();

router.get("/", notesActions.browse);
router.post("/", notesActions.add);
router.get("/:id", notesActions.read);
router.put("/:id", notesActions.edit);
router.delete("/:id", notesActions.remove);

export default router;
