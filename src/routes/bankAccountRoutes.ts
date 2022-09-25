import { Router } from "express";
import { BankAccountController } from "../api/useCases/BankAccount/BankAccountController";
import { bufferUserDataById } from "../middlewares/bufferUserDataById";
import { UUIDChecker } from "../middlewares/UUIDChecker";

const router = Router();

// Bank account controllers
router.post("/", (req, res, next) => BankAccountController.store(req, res, next));

export default router;