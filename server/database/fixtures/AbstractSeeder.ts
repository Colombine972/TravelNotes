import { faker } from "@faker-js/faker";
import database from "../client.js";

/**
 * Classe abstraite dont tous les seeders héritent
 */
abstract class AbstractSeeder {
  /** Nom de la table à remplir */
  table: string;

  /** Faut-il vider la table avant insertion */
  truncate: boolean;

  /** Promesses d’insertion (pour attendre la fin proprement) */
  promises: Promise<unknown>[] = [];

  /** Faker accessible dans tous les seeders */
  protected faker = faker;

  constructor(table: string, truncate = true) {
    this.table = table;
    this.truncate = truncate;
  }

  /**
   * Insère une ligne dans la table
   */
  protected insert(data: Record<string, unknown>) {
    const fields = Object.keys(data);
    const placeholders = fields.map(() => "?").join(",");

    const sql = `
      INSERT INTO ${this.table} (${fields.join(",")})
      VALUES (${placeholders})
    `;

    const promise = database.query(sql, Object.values(data));
    this.promises.push(promise);
  }

  /**
   * Méthode à implémenter dans chaque seeder
   */
  abstract run(): Promise<void>;
}

export default AbstractSeeder;
