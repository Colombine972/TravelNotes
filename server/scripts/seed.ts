import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import database from "../database/client.js";
import AbstractSeeder from "../database/fixtures/AbstractSeeder.js";

const fixturesPath = path.join(process.cwd(), "database", "fixtures");

const seed = async () => {
  console.log("🌱 Seeding database...");

  const files = fs
    .readdirSync(fixturesPath)
    .filter(
      (file) =>
        file.endsWith("Seeder.ts") &&
        file !== "AbstractSeeder.ts"
    );

  const seeders: AbstractSeeder[] = [];

  for (const file of files) {
    const modulePath = path.join(fixturesPath, file);
    const moduleUrl = pathToFileURL(modulePath).href;

    const mod = await import(moduleUrl);
    const SeederClass = mod.default;

    // ✅ Guard: vérifier que c'est instanciable
    if (typeof SeederClass !== "function") {
      throw new Error(
        `❌ ${file}: default export is not a class/constructor. ` +
        `Assure-toi d'avoir: export default class ...`
      );
    }

    seeders.push(new SeederClass() as AbstractSeeder);
  }

  // Nettoyage
  for (const seeder of seeders) {
    if (seeder.truncate) {
      await database.query(`DELETE FROM ${seeder.table}`);
    }
  }

  // Exécution
  for (const seeder of seeders) {
    await seeder.run();
    await Promise.all(seeder.promises);
  }

  console.log("✅ Seeding completed");
  process.exit(0);
};

export default seed();
