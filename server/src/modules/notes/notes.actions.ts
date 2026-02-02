import { Request, Response } from "express";
import { findAllNotes, insertNote, findNoteById } from "./notes.repository.js";


export async function getAllNotes(req: Request, res: Response) {
  try {
  const notes = await findAllNotes();
  res.json(notes);
} catch (error) {
  res.status(500).json({ message : "erreur lors de la récupération des notes"});
}
}

export async function addNote(req: Request, res: Response) {
  try {
  const { title, content } = req.body;

  // Validation minimale
  if (!title || !content) {
    res.status(400).json({ message: "title et content sont requis" });
    return;
  }
  
  const result = await insertNote(title, content);

  res.status(201).json({
    id: result.insertId,
    title,
    content,
  });
} catch (error) {
  res.status(500).json({ message : "erreur lors de l'enregistrement de la note" })
}
}

export async function getNotById(req: Request, res: Response) {
 try {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message : "id invalide" });
    return;
  }
 
  const notes = await findNoteById(id);

  if (notes.length === 0) {
    res.status(400).json({ message: "Note non trouvée" });
    return;
  }
  res.json(notes[0]);
} catch (error) {
  return res.status(500).json({ message : "erreur serveur"});
}
}