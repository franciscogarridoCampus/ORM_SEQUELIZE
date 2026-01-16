// controllers/base/pedidoBaseController.js
import pedidoService from "../../services/pedidoService.js";

export default class PedidosBaseController {
  static async crear(req, res) {
    try { const nuevo = await pedidoService.crear(req.body); res.status(201).json(nuevo); }
    catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al crear pedido", error }); }
  }

  static async obtenerTodos(req, res) {
    try { const lista = await pedidoService.obtenerTodos(); res.json(lista); }
    catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al obtener pedidos", error }); }
  }

  static async obtenerPorId(req, res) {
    try {
      const item = await pedidoService.obtenerPorId(req.params.id);
      if (!item) return res.status(404).json({ mensaje: "No encontrado" });
      res.json(item);
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al obtener pedido", error }); }
  }

  static async actualizar(req, res) {
    try {
      const item = await pedidoService.actualizar(req.params.id, req.body);
      if (!item) return res.status(404).json({ mensaje: "No encontrado" });
      res.json(item);
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al actualizar pedido", error }); }
  }

  static async eliminar(req, res) {
    try {
      const result = await pedidoService.eliminar(req.params.id);
      if (!result) return res.status(404).json({ mensaje: "No encontrado" });
      res.json({ mensaje: "pedido eliminado correctamente" });
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al eliminar pedido", error }); }
  }
}
