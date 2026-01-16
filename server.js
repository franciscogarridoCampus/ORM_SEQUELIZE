// server.js
import express from "express";
import { sequelize } from "./config/db.js";

// Importar todas las rutas
import productosRoutes from "./routes/productosRoutes.js";
import categoriasRoutes from "./routes/categoriasRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";
import pedidosRoutes from "./routes/pedidosRoutes.js";
import detallesPedidoRoutes from "./routes/detalles_pedidoRoutes.js";
import logRoutes from "./routes/logRoutes.js"; // <-- Nueva ruta

const app = express();
app.use(express.json());

// 🔌 Verificar y sincronizar la base de datos
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión establecida con la base de datos:", sequelize.config.database);
    await sequelize.sync({ alter: true });
    console.log("✅ Tablas sincronizadas correctamente.");
  } catch (error) {
    console.error("❌ Error al sincronizar las tablas:", error);
  }
})();

// 📦 Rutas principales
app.use("/productos", productosRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/clientes", clientesRoutes);
app.use("/pedidos", pedidosRoutes);
app.use("/detalles_pedido", detallesPedidoRoutes);
app.use("/log", logRoutes); // <-- Montamos la ruta log

// 🚀 Arrancar servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
