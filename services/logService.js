// services/logService.js
import Log from "../models/log.js";

export const crearLog = async (data) => {
  return await Log.create(data);
};

export const obtenerLogs = async () => {
  return await Log.findAll();
};

export const obtenerLogPorId = async (id) => {
  return await Log.findByPk(id);
};

export const actualizarLog = async (id, data) => {
  const log = await Log.findByPk(id);
  if (!log) return null;
  await log.update(data);
  return log;
};

export const eliminarLog = async (id) => {
  const log = await Log.findByPk(id);
  if (!log) return null;
  await log.destroy();
  return true;
};
