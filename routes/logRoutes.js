// routes/logRoutes.js
import express from "express";
import {
  obtenerLogs,
  obtenerLogPorId
} from "../services/logService.js";

const router = express.Router();

// GET todos los logs
router.get("/", async (req, res) => {
  try {
    const logs = await obtenerLogs();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener logs", error });
  }
});

// GET log por ID
router.get("/:id", async (req, res) => {
  try {
    const log = await obtenerLogPorId(req.params.id);
    if (!log) return res.status(404).json({ mensaje: "Log no encontrado" });
    res.json(log);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener log", error });
  }
});

export default router;
