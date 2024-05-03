import { authenticateSession } from "../middleware/authenticationMiddleware.js";
import { Router } from "express";
const router = Router();

router.get("/api/dashboard", authenticateSession, (req, res) => {
  return res.send({
    data: {
      message:
        "Welcome to your personal dashboard!.. There is not much because it's still under progress. Have a nice day! 😁",
    },
  });
});

export default router;
