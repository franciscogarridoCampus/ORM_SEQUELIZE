// services/productosService.js
import Productos from "../models/productos.js";
import { crearLog } from "./logService.js";

// CREATE
export const crearProductoService = async (data) => {
  const producto = await Productos.create(data);
  await crearLog({ log: `Producto creado: ${producto.nombre} (ID: ${producto.id})` });
  return producto;
};

// READ todos
export const obtenerProductosService = async () => {
  return await Productos.findAll();
};

// READ uno
export const obtenerProductoService = async (id) => {
  return await Productos.findByPk(id);
};

// UPDATE
export const actualizarProductoService = async (id, data) => {
  const producto = await Productos.findByPk(id);
  if (!producto) return null;

  await producto.update(data);
  await crearLog({ log: `Producto actualizado: ${producto.nombre} (ID: ${producto.id})` });

  return producto;
};

// DELETE
export const eliminarProductoService = async (id) => {
  const producto = await Productos.findByPk(id);
  if (!producto) return null;

  await producto.destroy();
  await crearLog({ log: `Producto eliminado: ${producto.nombre} (ID: ${producto.id})` });

  return true;
};
