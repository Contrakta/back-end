import { Router } from "express";
import { UserController } from "../api/useCases/User/UserController";
import { bufferUserDataById } from "../middlewares/bufferUserDataById";
import { UUIDChecker } from "../middlewares/UUIDChecker";

const router = Router();

// User controllers
router.post("/", (req, res, next) => UserController.store(req, res, next));

export default router;