import { isMatch } from "../utils/authHelpers.js";
import { getUserByName } from "../database/UserRepository.js";

export async function authenticateUser(req, res, next) {
  const { username, password } = req?.body;

  const user = await getUserByName(username);

  if (!user) {
    return res.status(401).send({ 
      data: { message: "Incorrect username or password." } 
    });
  }

  const isValid = isMatch(password, user.password);
  if (!isValid) {
    return res.status(401).send({
      data: { message: "Incorrect username or password." }
    });
  }
  
  req.user = username;
  next();
}

export function authenticateSession(req, res, next) {
  if(!req.session.user){
    return res.status(401).send({ 
      data: {message: "Unauthorized: No session found."}
    });
  }
  next();
}