import { Router } from "express";
import { ProductController } from "../api/useCases/Product/ProductController";

const router = Router();

// Bank account controllers
router.get("/", (req, res, next) => ProductController.getAll(req, res, next));
router.post("/", (req, res, next) => ProductController.store(req, res, next));
router.post("/:product_id/buy", (req, res, next) => ProductController.buy(req, res, next));

export default router;