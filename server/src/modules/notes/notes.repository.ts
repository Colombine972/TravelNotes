import { ResultSetHeader } from "mysql2";
import database from "../../database/client";

export async function findAllNotes() {
  const [rows] = await database.query("SELECT * FROM notes");
  return rows;
}

export async function insertNote(title: string, content: string) {
  const [result] = await database.query<ResultSetHeader>(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    [title, content]
  );

  return result;
}