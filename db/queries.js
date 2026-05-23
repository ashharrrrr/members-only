import { pool } from "./pool.js";

export async function addUserDB(fullname, username, password) {
  await pool.query(
    "INSERT INTO users (name, username, password_hash) VALUES ($1, $2, $3);",
    [fullname, username, password],
  );
}

export async function findUserDB(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
}

export async function getAllMessagesDB() {
  const SQL = `SELECT m.message_id, m.title, m.body, m.created_at, u.user_id, u.username, u.is_member FROM messages m JOIN users u ON m.user_id = u.user_id ORDER BY m.created_at DESC;`;
  const { rows } = await pool.query(SQL);
  return rows;
}

export async function postMessageDB(user_id, title, body) {
  await pool.query(
    "INSERT INTO messages (user_id, title, body) VALUES ($1, $2, $3);",
    [user_id, title, body],
  );
}

export async function makeMemberDB(userID) {
  await pool.query("UPDATE users SET is_member = TRUE WHERE user_id = $1", [userID])
}

export async function makeAdminDB(userID) {
  await pool.query("UPDATE users SET is_admin = TRUE WHERE user_id = $1", [userID])
}

export async function deleteMessageDB(messageId) {
  await pool.query("DELETE FROM messages WHERE message_id = $1", [messageId]);
}
