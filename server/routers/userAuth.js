import { Router } from "express";
const router = Router();

import { userRegistrationEmail } from "../emailScripts/userRegistration.js";
import { hashPassword } from "../utils/authHelpers.js";
import { authenticateUser } from "../middleware/authenticationMiddleware.js";
import { checkDuplicate, checkCredentialsNotEmpty, checkEmail, } from "../middleware/validationMiddleware.js";
import { database } from "../database/database.js";

router.post(
  "/api/signup",
  checkCredentialsNotEmpty,
  checkDuplicate,
  checkEmail,
  (req, res) => {
    const { username, email, password } = req?.body;
    const hashedPassword = hashPassword(password);

    database.push({
      username,
      email,
      password: hashedPassword,
    });

    //userRegistrationEmail(username);
    
    console.log(database);
    return res.status(201).send({ message: "User created", created: true });
  }
);

router.post(
  "/api/login",
  checkCredentialsNotEmpty,
  authenticateUser,
  (req, res) => {
    req.session.user = req.user;
    
    res.send({ message: "Login successful!", isMatch: true, user: req.session.user });
  }
);

// router.get('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       return res.status(400).send('Unable to log out')
//     } else {
//       res.clearCookie('connect.sid');
//       return res.send('Logout successful');
//     }
//   });
// });


export default router;
