// controllers/base/clienteBaseController.js
import clienteService from "../../services/clienteService.js";

export default class ClientesBaseController {
  static async crear(req, res) {
    try { const nuevo = await clienteService.crear(req.body); res.status(201).json(nuevo); }
    catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al crear cliente", error }); }
  }

  static async obtenerTodos(req, res) {
    try { const lista = await clienteService.obtenerTodos(); res.json(lista); }
    catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al obtener clientes", error }); }
  }

  static async obtenerPorId(req, res) {
    try {
      const item = await clienteService.obtenerPorId(req.params.id);
      if (!item) return res.status(404).json({ mensaje: "No encontrado" });
      res.json(item);
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al obtener cliente", error }); }
  }

  static async actualizar(req, res) {
    try {
      const item = await clienteService.actualizar(req.params.id, req.body);
      if (!item) return res.status(404).json({ mensaje: "No encontrado" });
      res.json(item);
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al actualizar cliente", error }); }
  }

  static async eliminar(req, res) {
    try {
      const result = await clienteService.eliminar(req.params.id);
      if (!result) return res.status(404).json({ mensaje: "No encontrado" });
      res.json({ mensaje: "cliente eliminado correctamente" });
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al eliminar cliente", error }); }
  }
}
