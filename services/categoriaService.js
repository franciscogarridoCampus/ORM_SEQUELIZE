// services/categoriaService.js
import { sequelize } from "../config/db.js";
import categorias from "../models/categorias.js";
import { DataTypes } from "sequelize";

const Categorias = categorias.init(sequelize, DataTypes);

export default class CategoriasService {
  static async crear(data) { return await Categorias.create(data); }
  static async obtenerTodos() { return await Categorias.findAll(); }
  static async obtenerPorId(id) { return await Categorias.findByPk(id); }
  static async actualizar(id, data) {
    const item = await Categorias.findByPk(id);
    if (!item) return null;
    return await item.update(data);
  }
  static async eliminar(id) {
    const item = await Categorias.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
  }
}
