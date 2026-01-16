// services/productoService.js
import { sequelize } from "../config/db.js";
import productos from "../models/productos.js";
import { DataTypes } from "sequelize";

const Productos = productos.init(sequelize, DataTypes);

export default class ProductosService {
  static async crear(data) { return await Productos.create(data); }
  static async obtenerTodos() { return await Productos.findAll(); }
  static async obtenerPorId(id) { return await Productos.findByPk(id); }
  static async actualizar(id, data) {
    const item = await Productos.findByPk(id);
    if (!item) return null;
    return await item.update(data);
  }
  static async eliminar(id) {
    const item = await Productos.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
  }
}
