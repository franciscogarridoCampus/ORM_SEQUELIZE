// services/logService.js
import { sequelize } from "../config/db.js";
import log from "../models/log.js";
import { DataTypes } from "sequelize";

const Log = log.init(sequelize, DataTypes);

export default class LogService {
  static async crear(data) { return await Log.create(data); }
  static async obtenerTodos() { return await Log.findAll(); }
  static async obtenerPorId(id) { return await Log.findByPk(id); }
  static async actualizar(id, data) {
    const item = await Log.findByPk(id);
    if (!item) return null;
    return await item.update(data);
  }
  static async eliminar(id) {
    const item = await Log.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
  }
}
