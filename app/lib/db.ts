import { DatabaseSync } from "node:sqlite";

let db: DatabaseSync | null = null;

export async function getDb(): Promise<DatabaseSync> {
  // If the connection already exists, return it.
  if (db) {
    return db;
  }

  try {
    const newDb = new DatabaseSync("./machinery.db");
    console.log("Successful connection to SQLite database");

    console.log("Checking: database tables exist");

    // create posts table (with placeholder for future authenticated user if needed)
    newDb.exec(`
      CREATE TABLE IF NOT EXISTS posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          author_id INTEGER DEFAULT 1,
          author TEXT DEFAULT 'Auth User',
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )`);

    // create comments table (with placeholder for future authenticated user if needed)
    newDb.exec(`
      CREATE TABLE IF NOT EXISTS comments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          post_id INTEGER NOT NULL,
          author_id INTEGER DEFAULT 1,
          author TEXT DEFAULT 'Auth User',
          content TEXT NOT NULL,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
      )`);

    console.log("Database tables are ready.");

    db = newDb;
    return db;
  } catch (err) {
    console.error("Failure to connect to or initialize the SQLite database:", err);
    throw err;
  }
}
