import { isMatch } from "../utils/authHelpers.js";
import { database } from "../database/database.js";

export function authenticateUser(req, res, next) {
  const { username, password } = req?.body;

  const user = database.find((user) => user.username === username);
  if (!user) {
    return res.status(401).send({ message: "Incorrect username or password" });
  }

  const isValid = isMatch(password, user.password);
  if (!isValid) {
    return res.status(401).send({ message: "Incorrect username or password" });
  }
  
  req.user = username;
  next();
}

export function authenticateSession(req, res, next) {
  if(!req.session.user){
    res.status(401).send({ message: "Unauthorized: No session found" });
  }
  next();
}