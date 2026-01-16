// routes/logRoutes.js
import express from "express";
import LogController from "../controllers/logController.js";

const router = express.Router();

router.get("/", LogController.obtenerTodos);
router.get("/:id", LogController.obtenerPorId);
router.post("/", LogController.crear);
router.put("/:id", LogController.actualizar);
router.delete("/:id", LogController.eliminar);

export default router;
