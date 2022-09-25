import { Router } from "express";
import { UserController } from "../api/useCases/User/UserController";
import { bufferUserDataById } from "../middlewares/bufferUserDataById";
import { UUIDChecker } from "../middlewares/UUIDChecker";

const router = Router();

// User controllers
router.post("/", (req, res, next) => UserController.store(req, res, next));
router.post("/:id/refresh-open-finance-avaialable-accounts", (req, res, next) => UserController.refreshOpenFinanceAvailableAccounts(req, res, next));
router.get("/:id", (req, res, next) => UserController.findById(req, res, next));
router.get("/:id/contracts", (req, res, next) => UserController.listActiveContracts(req, res, next));

export default router;