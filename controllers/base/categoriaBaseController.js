// controllers/base/categoriaBaseController.js
import categoriaService from "../../services/categoriaService.js";

export default class CategoriasBaseController {
  static async crear(req, res) {
    try { const nuevo = await categoriaService.crear(req.body); res.status(201).json(nuevo); }
    catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al crear categoria", error }); }
  }

  static async obtenerTodos(req, res) {
    try { const lista = await categoriaService.obtenerTodos(); res.json(lista); }
    catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al obtener categorias", error }); }
  }

  static async obtenerPorId(req, res) {
    try {
      const item = await categoriaService.obtenerPorId(req.params.id);
      if (!item) return res.status(404).json({ mensaje: "No encontrado" });
      res.json(item);
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al obtener categoria", error }); }
  }

  static async actualizar(req, res) {
    try {
      const item = await categoriaService.actualizar(req.params.id, req.body);
      if (!item) return res.status(404).json({ mensaje: "No encontrado" });
      res.json(item);
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al actualizar categoria", error }); }
  }

  static async eliminar(req, res) {
    try {
      const result = await categoriaService.eliminar(req.params.id);
      if (!result) return res.status(404).json({ mensaje: "No encontrado" });
      res.json({ mensaje: "categoria eliminado correctamente" });
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al eliminar categoria", error }); }
  }
}
