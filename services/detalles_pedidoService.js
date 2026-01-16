// services/detalles_pedidoService.js
import { sequelize } from "../config/db.js";
import detalles_pedido from "../models/detalles_pedido.js";
import { DataTypes } from "sequelize";

const Detalles_pedido = detalles_pedido.init(sequelize, DataTypes);

export default class Detalles_pedidoService {
  static async crear(data) { return await Detalles_pedido.create(data); }
  static async obtenerTodos() { return await Detalles_pedido.findAll(); }
  static async obtenerPorId(id) { return await Detalles_pedido.findByPk(id); }
  static async actualizar(id, data) {
    const item = await Detalles_pedido.findByPk(id);
    if (!item) return null;
    return await item.update(data);
  }
  static async eliminar(id) {
    const item = await Detalles_pedido.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
  }
}
