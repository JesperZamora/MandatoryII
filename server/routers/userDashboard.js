import { authenticateSession } from "../middleware/authenticationMiddleware.js";
import { Router } from "express";
const router = Router();

router.get("/api/dashboard", authenticateSession, (req, res) => {
  return res.send({ 
    data: { message: "Welcome to you dashboard!.." }
  });
});

export default router;