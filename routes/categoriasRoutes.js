// routes/categoriasRoutes.js
import express from "express";
import CategoriasController from "../controllers/categoriasController.js";

const router = express.Router();

router.get("/", CategoriasController.obtenerTodos);
router.get("/:id", CategoriasController.obtenerPorId);
router.post("/", CategoriasController.crear);
router.put("/:id", CategoriasController.actualizar);
router.delete("/:id", CategoriasController.eliminar);

export default router;
