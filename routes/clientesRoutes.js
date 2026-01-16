// routes/clientesRoutes.js
import express from "express";
import ClientesController from "../controllers/clientesController.js";

const router = express.Router();

router.get("/", ClientesController.obtenerTodos);
router.get("/:id", ClientesController.obtenerPorId);
router.post("/", ClientesController.crear);
router.put("/:id", ClientesController.actualizar);
router.delete("/:id", ClientesController.eliminar);

export default router;
