import { useEffect, useState } from "react";
import "../styles/Notes.css";

type Note = {
    id: number;
    title: string;
    content: string;
    created_at: string;
};

function Notes() {
    const [notes, setNotes] = useState<Note[]>([]);
    
   const getNotes = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notes`);

    if (!response.ok) {
      throw new Error("Erreur lors du chargement des notes");
    }

    const data = await response.json();
    setNotes(data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  getNotes();
}, []);

return (
    <section className="notes-page">
      <h2 className="notes-title">Mes notes</h2>

      <div className="notes-grid">
        {notes.map((note) => (
          <article key={note.id} className="note-card">
            <div className="note-icon">📄</div>

            <div className="note-content">
              <h3 className="note-title">{note.title}</h3>
              <p className="note-date"> {new Intl.DateTimeFormat("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              }).format(new Date(note.created_at))}</p>
              <p className="note-text">{note.content}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
)
}
export default Notes;