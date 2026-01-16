// routes/detalles_pedidoRoutes.js
import express from "express";
import Detalles_pedidoController from "../controllers/detalles_pedidoController.js";

const router = express.Router();

router.get("/", Detalles_pedidoController.obtenerTodos);
router.get("/:id", Detalles_pedidoController.obtenerPorId);
router.post("/", Detalles_pedidoController.crear);
router.put("/:id", Detalles_pedidoController.actualizar);
router.delete("/:id", Detalles_pedidoController.eliminar);

export default router;
