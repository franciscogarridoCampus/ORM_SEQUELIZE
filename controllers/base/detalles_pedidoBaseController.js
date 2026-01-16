// controllers/base/detalles_pedidoBaseController.js
import detalles_pedidoService from "../../services/detalles_pedidoService.js";

export default class Detalles_pedidoBaseController {
  static async crear(req, res) {
    try { const nuevo = await detalles_pedidoService.crear(req.body); res.status(201).json(nuevo); }
    catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al crear detalles_pedido", error }); }
  }

  static async obtenerTodos(req, res) {
    try { const lista = await detalles_pedidoService.obtenerTodos(); res.json(lista); }
    catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al obtener detalles_pedido", error }); }
  }

  static async obtenerPorId(req, res) {
    try {
      const item = await detalles_pedidoService.obtenerPorId(req.params.id);
      if (!item) return res.status(404).json({ mensaje: "No encontrado" });
      res.json(item);
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al obtener detalles_pedido", error }); }
  }

  static async actualizar(req, res) {
    try {
      const item = await detalles_pedidoService.actualizar(req.params.id, req.body);
      if (!item) return res.status(404).json({ mensaje: "No encontrado" });
      res.json(item);
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al actualizar detalles_pedido", error }); }
  }

  static async eliminar(req, res) {
    try {
      const result = await detalles_pedidoService.eliminar(req.params.id);
      if (!result) return res.status(404).json({ mensaje: "No encontrado" });
      res.json({ mensaje: "detalles_pedido eliminado correctamente" });
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al eliminar detalles_pedido", error }); }
  }
}
