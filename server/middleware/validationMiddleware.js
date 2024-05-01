import { getUserByName } from "../database/UserRepository.js";

export function checkCredentialsNotEmpty(req, res, next) {
  req.body.username = req.body.username.trim();
  req.body.password = req.body.password.trim();
  
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ 
      data: { message: "Username and password cannot be empty." }
    });
  }
  next();
}

export async function checkDuplicate(req, res, next) {
  const { username } = req.body;

  const exists = await getUserByName(username);

  if (exists) {
    return res.status(409).send({ 
      data: {  message: "Username already taken.", created: false } 
    });
  }
  next();
}

export function checkEmail(req, res, next) {
  const email = req.body.email.trim();

  if (!email) {
    return res.status(400).send({ 
      data: { message: "Email cannot be empty." } 
    });
  }

  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).send({ 
      data: { message: "Email must contain '@' and '.'" } 
    });
  }
  next();
}


