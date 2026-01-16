// controllers/base/logBaseController.js
import logService from "../../services/logService.js";

export default class LogBaseController {
  static async crear(req, res) {
    try { const nuevo = await logService.crear(req.body); res.status(201).json(nuevo); }
    catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al crear log", error }); }
  }

  static async obtenerTodos(req, res) {
    try { const lista = await logService.obtenerTodos(); res.json(lista); }
    catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al obtener log", error }); }
  }

  static async obtenerPorId(req, res) {
    try {
      const item = await logService.obtenerPorId(req.params.id);
      if (!item) return res.status(404).json({ mensaje: "No encontrado" });
      res.json(item);
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al obtener log", error }); }
  }

  static async actualizar(req, res) {
    try {
      const item = await logService.actualizar(req.params.id, req.body);
      if (!item) return res.status(404).json({ mensaje: "No encontrado" });
      res.json(item);
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al actualizar log", error }); }
  }

  static async eliminar(req, res) {
    try {
      const result = await logService.eliminar(req.params.id);
      if (!result) return res.status(404).json({ mensaje: "No encontrado" });
      res.json({ mensaje: "log eliminado correctamente" });
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al eliminar log", error }); }
  }
}
