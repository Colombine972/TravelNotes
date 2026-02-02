import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "../../../database/client.js";

class notesRepository {

  async findAll() {
  const [rows] = await database.query("SELECT * FROM notes");
  return rows;
}

 async insertNote(title: string, content: string) {
  const [result] = await database.query<ResultSetHeader>(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    [title, content]
  );

  return result;
}

   async  findNoteById(id: number) {
  const [rows] = await database.query<RowDataPacket[]>(
    "SELECT * FROM notes WHERE id = ?", 
    [id]);
    return rows;
}

  async updateNote (id: number, title: string, content: string) {
    const [result] = await database.query<ResultSetHeader>(
      "UPDATE notes SET title = ?, content = ? WHERE id = ?", 
      [title, content, id]
    )
    return result;
  }
  

   async removeNote(id: number) {
  const [result] = await database.query<ResultSetHeader>(
    "DELETE FROM notes WHERE id = ?",
    [id],
  );
  return result.affectedRows === 1;
}
}

export default new notesRepository(); 