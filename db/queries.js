import { pool } from "./pool.js";

export async function addUserDB(fullname, username, password){
    await pool.query("INSERT INTO users (name, username, password) VALUES ($1, $2, $3);", [fullname, username, password]);
}

export async function findUserDB(username){
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows[0];
}
