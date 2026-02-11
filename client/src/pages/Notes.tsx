import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import "../styles/Notes.css";

type Note = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(dateString));
  };

  const getNotes = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notes`
      );

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
    <>
      <section className="notes-page">
        <h2 className="notes-title">Mes notes</h2>

        <div className="notes-grid">
          {notes.map((note) => (
            <article
              key={note.id}
              className="note-card"
              onClick={() => setSelectedNote(note)}
              role="button"
              tabIndex={0}
            >
              <div className="note-icon">📄</div>

              <div className="note-content">
                <h3 className="note-title">{note.title}</h3>
                <p className="note-date">
                  {formatDate(note.created_at)}
                </p>
              </div>

              <p className="note-text">{note.content}</p>
            </article>
          ))}
        </div>
      </section>

      <Modal
        isOpen={selectedNote !== null}
        onClose={() => setSelectedNote(null)}
      >
        {selectedNote && (
          <div className="note-modal">
            <h2 className="note-modal-title">
              {selectedNote.title}
            </h2>

            <p className="note-modal-date">
              {formatDate(selectedNote.created_at)}
            </p>

            <p className="note-modal-content">
              {selectedNote.content}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}

export default Notes;


