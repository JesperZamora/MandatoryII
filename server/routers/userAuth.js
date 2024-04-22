import { Router } from "express";
const router = Router();

import { userRegistrationEmail } from "../emailScripts/userRegistration.js";
import { hashPassword } from "../utils/authHelpers.js";
import { authenticateUser } from "../middleware/authenticationMiddleware.js";
import { checkDuplicate, checkCredentialsNotEmpty, } from "../middleware/validationMiddleware.js";
import { database } from "../database/database.js";

router.post(
  "/api/signup",
  checkCredentialsNotEmpty,
  checkDuplicate,
  (req, res) => {
    const { username, password } = req?.body;
    const hashedPassword = hashPassword(password);

    database.push({
      username,
      password: hashedPassword,
    });

    //userRegistrationEmail(username);

    return res.status(201).send({ message: "User created", username });
  }
);

router.post(
  "/api/login",
  checkCredentialsNotEmpty,
  authenticateUser,
  (req, res) => {
    req.session.user = {
      user: req.user.name,
    };
    res.send({ message: "Login successful!", user: req.user.name });
  }
);

export default router;
