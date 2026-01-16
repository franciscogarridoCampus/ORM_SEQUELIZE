// routes/productosRoutes.js
import express from "express";
import ProductosController from "../controllers/productosController.js";

const router = express.Router();

router.get("/", ProductosController.obtenerTodos);
router.get("/:id", ProductosController.obtenerPorId);
router.post("/", ProductosController.crear);
router.put("/:id", ProductosController.actualizar);
router.delete("/:id", ProductosController.eliminar);

export default router;
