import { authenticateSession } from "../../middleware/authenticationMiddleware.js";
import { Router } from "express";
const router = Router();

router.get("/api/dashboard", authenticateSession, (req, res) => {
  res.send({ message: "You are now logged in"});
});

export default router;