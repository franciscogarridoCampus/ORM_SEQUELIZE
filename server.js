import express from "express";
import { Sequelize } from "sequelize"; // Necesario para inicializar modelos
import { sequelize } from "./config/db.js";

// Importar rutas
import productoRoutes from "./routes/productosRoutes.js";
import logRoutes from "./routes/logRoutes.js"; // <-- Rutas Log

// Importar modelos
import Productos from "./models/productos.js";
import Log from "./models/log.js"; // <-- Modelo Log

const app = express();
app.use(express.json());

// Inicializar modelos
Productos.init(sequelize, Sequelize);
Log.init(sequelize, Sequelize);

// Rutas
app.use("/productos", productoRoutes);
app.use("/logs", logRoutes); // <-- Rutas Log

// Sincronizar base de datos y arrancar servidor
(async () => {
  try {
    // Sincroniza las tablas según los modelos
    await sequelize.sync({ alter: true });
    console.log("✅ Tablas sincronizadas.");

    // Iniciar servidor después de sincronizar
    const PORT = 3000;
    app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
  } catch (error) {
    console.error("❌ Error al sincronizar las tablas:", error);
  }
})();
