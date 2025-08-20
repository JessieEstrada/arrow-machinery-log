import sqlite from "node:sqlite";

let db: sqlite.DatabaseSync | null = null;

export function getDb(): Promise<sqlite.DatabaseSync> {
  return new Promise((resolve, reject) => {
    try {
      if (db) return resolve(db);

      db = new sqlite.DatabaseSync("./machinery.db");
      console.log("Successful connetion to SQLite database");
      resolve(db);
    } catch (err) {
      console.error("Failure to connect to the SQLite database:", err);
      reject(err);
    }
  });
}
