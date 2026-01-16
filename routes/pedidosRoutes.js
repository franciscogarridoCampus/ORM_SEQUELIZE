// routes/pedidosRoutes.js
import express from "express";
import PedidosController from "../controllers/pedidosController.js";

const router = express.Router();

router.get("/", PedidosController.obtenerTodos);
router.get("/:id", PedidosController.obtenerPorId);
router.post("/", PedidosController.crear);
router.put("/:id", PedidosController.actualizar);
router.delete("/:id", PedidosController.eliminar);

export default router;
