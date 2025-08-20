import { getDb } from "./app/lib/db.ts";

async function initDb() {
  try {
    const db = await getDb();

    // create posts table (with placeholder for future authenticated user if needed)
    db.exec(`
            CREATE TABLE IF NOT EXISTS posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                author_id INTEGER DEFAULT 1,
                author TEXT DEFAULT 'Auth User',
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )`);

    // create comments table (with placeholder for future authenticated user if needed)
    db.exec(`
            CREATE TABLE IF NOT EXISTS comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                post_id INTEGER NOT NULL,
                author_id INTEGER DEFAULT 1,
                author TEXT DEFAULT 'Auth User',
                content TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
            )`);

    console.log("Database Initialization Successful");
  } catch (errorDb) {
    console.error("Error Initializing the database:", errorDb);
  }
}

initDb();
