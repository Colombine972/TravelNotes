import mysql from "mysql2/promise";

export type Result = mysql.ResultSetHeader;
export type Rows = mysql.RowDataPacket[];

const database = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default database;