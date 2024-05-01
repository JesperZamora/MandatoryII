import { Router } from "express";
const router = Router();

import { userRegistrationEmail } from "../emailScripts/userRegistration.js";
import { hashPassword } from "../utils/authHelpers.js";
import { authenticateUser } from "../middleware/authenticationMiddleware.js";
import { checkDuplicate, checkCredentialsNotEmpty, checkEmail, } from "../middleware/validationMiddleware.js";
import { createUser } from "../database/UserRepository.js";

router.post("/api/signup",
  checkCredentialsNotEmpty, checkDuplicate,checkEmail,
  async (req, res) => {
    const { username, email, password } = req?.body;
    const hashedPassword = hashPassword(password);
    
    const userData = await createUser(username, email, hashedPassword);
    //userRegistrationEmail(username);
    
    return res.status(201).send({data: { 
      message: "User created.", 
      created: true,
      username: userData.username,
      email: userData.email
    }});
  }
);

router.post("/api/login", 
  checkCredentialsNotEmpty, authenticateUser, 
  async (req, res) => {
    req.session.user = req.user;
    
    return res.status(200).send({ data: { 
      message: "Login successful!", 
      isMatch: true, 
      username: req.session.user 
    }});
  }
);

router.get("/api/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send({ data: {message: "Logout failed." }});
      }
      res.clearCookie("connect.sid");
      res.send({ data: { message: "Logged out successfully!" }});
    });
  } else {
    return res.status(400).send({data: { message: "No active session to logout." }});
  }
});


export default router;
