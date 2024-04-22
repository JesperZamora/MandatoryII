import { database } from "../database/database.js";

export function checkDuplicate(req, res, next) {
  const { username } = req.body;
  const exists = database.some((user) => user.username === username);
  if (exists) {
    return res
      .status(409)
      .send({ message: "Username already taken" });
  }
  next();
}

export function checkCredentialsNotEmpty(req, res, next) {
  req.body.username = req.body.username.trim();
  req.body.password = req.body.password.trim();
  
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: "Username and password cannot be empty" });
  }
  next();
}

