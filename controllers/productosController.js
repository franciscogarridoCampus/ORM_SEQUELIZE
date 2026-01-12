import {
  crearProductoService,
  obtenerProductosService,
  obtenerProductoService,
  actualizarProductoService,
  eliminarProductoService
} from "../services/productosService.js";

export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = await crearProductoService(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear producto", error });
  }
};

export const obtenerProductos = async (req, res) => {
  try {
    const productos = await obtenerProductosService();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener productos", error });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    const producto = await obtenerProductoService(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener producto", error });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const producto = await actualizarProductoService(req.params.id, req.body);
    if (!producto) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar producto", error });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const eliminado = await eliminarProductoService(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar producto", error });
  }
};
