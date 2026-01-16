// controllers/base/productoBaseController.js
import productoService from "../../services/productoService.js";

export default class ProductosBaseController {
  static async crear(req, res) {
    try { const nuevo = await productoService.crear(req.body); res.status(201).json(nuevo); }
    catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al crear producto", error }); }
  }

  static async obtenerTodos(req, res) {
    try { const lista = await productoService.obtenerTodos(); res.json(lista); }
    catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al obtener productos", error }); }
  }

  static async obtenerPorId(req, res) {
    try {
      const item = await productoService.obtenerPorId(req.params.id);
      if (!item) return res.status(404).json({ mensaje: "No encontrado" });
      res.json(item);
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al obtener producto", error }); }
  }

  static async actualizar(req, res) {
    try {
      const item = await productoService.actualizar(req.params.id, req.body);
      if (!item) return res.status(404).json({ mensaje: "No encontrado" });
      res.json(item);
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al actualizar producto", error }); }
  }

  static async eliminar(req, res) {
    try {
      const result = await productoService.eliminar(req.params.id);
      if (!result) return res.status(404).json({ mensaje: "No encontrado" });
      res.json({ mensaje: "producto eliminado correctamente" });
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al eliminar producto", error }); }
  }
}
