import connection from "./connection.js";
import { hashPassword } from "../utils/authHelpers.js";

async function createUserTable() {
  try {
    await connection.query(`DROP TABLE IF EXISTS users;`);

    await connection.query(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255),
      email VARCHAR(255),
      password VARCHAR(255)
    );`);

    const sql = `INSERT INTO users (username, email, password) VALUES(?,?,?);`;

    await connection.execute(sql, [
      "jamora",
      "jw@gmail.com",
      hashPassword("abc123"),
    ]);
    await connection.execute(sql, [
      "johnnybravo",
      "jw@yahoo.com",
      hashPassword("cocacola123"),
    ]);
    await connection.execute(sql, [
      "janedoe",
      "jd@yicloud.com",
      hashPassword("thisismypassword"),
    ]);

    return "User table created";
  } catch (err) {
    console.log(err);
  }
}

export default createUserTable;
