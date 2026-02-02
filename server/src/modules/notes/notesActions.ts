import { Request, RequestHandler, Response } from "express";
import notesRepository from "../notes/notesRepository.js"


const browse: RequestHandler = async (req: Request, res: Response) => {
  try {
  const notes = await notesRepository.findAll();
  res.json(notes);
} catch (error) {
  res.status(500).json({ message : "erreur lors de la récupération des notes"});
}
}

const add: RequestHandler = async (req: Request, res: Response) => {
  try {
  const { title, content } = req.body;

  // Validation minimale
  if (!title || !content) {
    res.status(400).json({ message: "title et content sont requis" });
    return;
  }
  
  const result = await notesRepository.insertNote(title, content);

  res.status(201).json({
    id: result.insertId,
    title,
    content,
  });
} catch (error) {
  res.status(500).json({ message : "erreur lors de l'enregistrement de la note" })
}
}

const read: RequestHandler = async (req: Request, res: Response) => {
 try {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message : "id invalide" });
    return;
  }
 
  const notes = await notesRepository.findNoteById(id);

  if (notes.length === 0) {
    res.status(404).json({ message: "Note non trouvée" });
    return;
  }
  res.json(notes[0]);
} catch (error) {
  return res.status(500).json({ message : "erreur lors de la récupération de la note"});
}
}

const edit: RequestHandler = async (req, res) => {
  try {
    // 1️⃣ Récupération et validation de l'id
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    // 2️⃣ Récupération des données du body
    const { title, content } = req.body;

    // 3️⃣ Validation minimale
    if (!title || !content) {
      return res.status(400).json({
        message: "Le titre et le contenu sont requis",
      });
    }

    // 4️⃣ Appel au repository
    const result = await notesRepository.updateNote(id, title, content);

    // 5️⃣ Vérification de l'existence de la ressource
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Message non trouvé" });
    }

    // 6️⃣ Réponse HTTP
    return res.json({
      id,
      title,
      content
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}



const remove: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const deleted = await notesRepository.removeNote(id);

    if (!deleted) {
      return res.status(404).json({ message: "Note non trouvée" });
    }

    return res.status(200).json({
      message: `Note ${id} supprimée`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la note" });
  }
};



export default { browse, read, add, edit, remove};