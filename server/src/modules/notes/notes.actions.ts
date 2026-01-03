import { Request, Response } from "express";
import { findAllNotes, insertNote } from "./notes.repository";

export async function getAllNotes(req: Request, res: Response) {
  const notes = await findAllNotes();
  res.json(notes);
}

export async function addNote(req: Request, res: Response) {
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
}