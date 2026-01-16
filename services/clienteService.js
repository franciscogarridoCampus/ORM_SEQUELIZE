// services/clienteService.js
import { sequelize } from "../config/db.js";
import clientes from "../models/clientes.js";
import { DataTypes } from "sequelize";

const Clientes = clientes.init(sequelize, DataTypes);

export default class ClientesService {
  static async crear(data) { return await Clientes.create(data); }
  static async obtenerTodos() { return await Clientes.findAll(); }
  static async obtenerPorId(id) { return await Clientes.findByPk(id); }
  static async actualizar(id, data) {
    const item = await Clientes.findByPk(id);
    if (!item) return null;
    return await item.update(data);
  }
  static async eliminar(id) {
    const item = await Clientes.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
  }
}
