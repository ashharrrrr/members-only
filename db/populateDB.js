import { Client } from "pg";
import "dotenv/config";

const client = new Client({
  connectionString: process.env.POSTGRES_URI
});

async function main() {
  try {
    await client.connect();

    console.log("Dropping tables...");
    await client.query(`
      DROP TABLE IF EXISTS messages;
      DROP TABLE IF EXISTS users;
    `);

    console.log("Creating users table...");
    await client.query(`
      CREATE TABLE users (
        user_id BIGSERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Creating messages table...");
    await client.query(`
      CREATE TABLE messages (
        message_id BIGSERIAL PRIMARY KEY,
        user_id BIGINT NOT NULL,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_user
          FOREIGN KEY (user_id)
          REFERENCES users(user_id)
          ON DELETE CASCADE
      );
    `);
    console.log("Database setup complete");
  } catch (err) {
    console.error("Error setting up database:", err);
  } finally {
    await client.end();
  }
}

main();

