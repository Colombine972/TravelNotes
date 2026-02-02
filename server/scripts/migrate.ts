import "dotenv/config";
import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";

const schemaPath = path.join(process.cwd(), "database/schema.sql");

const migrate = async () => {
  const sql = fs.readFileSync(schemaPath, "utf8");

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

  await connection.query(sql);
  await connection.end();

  console.log("✅ DB migrated");
};

migrate();
 