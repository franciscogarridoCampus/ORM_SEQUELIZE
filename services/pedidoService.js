// services/pedidoService.js
import { sequelize } from "../config/db.js";
import pedidos from "../models/pedidos.js";
import { DataTypes } from "sequelize";

const Pedidos = pedidos.init(sequelize, DataTypes);

export default class PedidosService {
  static async crear(data) { return await Pedidos.create(data); }
  static async obtenerTodos() { return await Pedidos.findAll(); }
  static async obtenerPorId(id) { return await Pedidos.findByPk(id); }
  static async actualizar(id, data) {
    const item = await Pedidos.findByPk(id);
    if (!item) return null;
    return await item.update(data);
  }
  static async eliminar(id) {
    const item = await Pedidos.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
  }
}
