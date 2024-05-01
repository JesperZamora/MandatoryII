import connection from "./connection.js";

export async function createUser(username, email, password) {
  const result = await connection.query("INSERT INTO users(username, email, password) VALUES(?,?,?)", [username, email, password]);
  const id = result[0].insertId;
  const data = await getUserById(id);
  return data;
}

async function getUserById(id) {
  const [row] = await connection.query("SELECT username, email FROM users WHERE users.id=?;", [id]);
  return row[0];
}

export async function getUserByName(username) {
  const [row] = await connection.query("SELECT username, password FROM users WHERE username=?", [username]);
  return row[0];
}