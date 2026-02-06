  import { useState } from "react";
  import "../styles/NewNote.css";
  
  type NoteToAdd = {
    title: string;
    content: string;
  }

  function NewNote() {

    const [noteToAdd, setNoteToAdd] = useState<NoteToAdd>({
        title: "",
        content: "",
    });

      const updateNote = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNoteToAdd((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    const sendNote = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/notes/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: noteToAdd.title,
            content: noteToAdd.content,
          }),
        }
    );
       
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
    
      setNoteToAdd({ title: "", content: "" });
      
    } catch (err) {
      console.error("Erreur lors de la création de la note");
    }
  };

    const cancelNote = () => {
    setNoteToAdd({ title: "", content: "" });
  };
  
   
  return (
    <div className="new-note-page">
  <form onSubmit={sendNote}>
        <label htmlFor="title">Titre de la note :</label>
        <input
            type="text"
            name="title"
            value={noteToAdd.title}
            onChange={updateNote}
            required
            placeholder="Le titre de ta note"
          />
     

        <label htmlFor="content">Contenu de la note :</label>
          <textarea
            name="content"
            value={noteToAdd.content}
            onChange={updateNote}
            required
            placeholder="Ecrit tes notes ici ..."
          />
        <button type="submit" className="save_note">
          Enregistre ta note
        </button>
        <button
          type="button"
          className="cancel_note"
          onClick={cancelNote}
        >
          Annuler
        </button>
        
      </form>
      </div>
  )
  }

  export default NewNote;