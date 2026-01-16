// autocrud.js
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const modelsPath = "./models";
const servicesPath = "./services";
const controllersPath = "./controllers";
const baseControllersPath = path.join(controllersPath, "base");
const routesPath = "./routes";

// Crear carpetas si no existen
fs.mkdirSync(servicesPath, { recursive: true });
fs.mkdirSync(baseControllersPath, { recursive: true });
fs.mkdirSync(routesPath, { recursive: true });

// ----------------- GENERAR MODELOS AUTOMÁTICAMENTE -----------------
try {
  console.log("⚡ Generando modelos con sequelize-auto...");
  execSync(`npx sequelize-auto -h localhost -d api_rest_db -u root -p 3306 -x -e mysql -o "${modelsPath}" -l esm`, { stdio: "inherit" });
  console.log("✅ Modelos generados correctamente.");
} catch (err) {
  console.error("❌ Error generando modelos:", err);
}

// ----------------- LEER MODELOS -----------------
const models = fs.readdirSync(modelsPath)
  .filter(f => f.endsWith(".js") && f !== "init-models.js");

for (const modelFile of models) {
  const modelName = path.basename(modelFile, ".js"); // ejemplo: productos
  const modelClass = modelName.charAt(0).toUpperCase() + modelName.slice(1); // Productos
  const singular = modelName.replace(/s$/, ""); // producto, cliente, pedido, etc.

  // ----------------- SERVICE -----------------
  const serviceContent = `// services/${singular}Service.js
import { sequelize } from "../config/db.js";
import ${modelName} from "../models/${modelFile}";
import { DataTypes } from "sequelize";

const ${modelClass} = ${modelName}.init(sequelize, DataTypes);

export default class ${modelClass}Service {
  static async crear(data) { return await ${modelClass}.create(data); }
  static async obtenerTodos() { return await ${modelClass}.findAll(); }
  static async obtenerPorId(id) { return await ${modelClass}.findByPk(id); }
  static async actualizar(id, data) {
    const item = await ${modelClass}.findByPk(id);
    if (!item) return null;
    return await item.update(data);
  }
  static async eliminar(id) {
    const item = await ${modelClass}.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
  }
}
`;

  fs.writeFileSync(`${servicesPath}/${singular}Service.js`, serviceContent);

  // ----------------- BASE CONTROLLER -----------------
  const baseControllerContent = `// controllers/base/${singular}BaseController.js
import ${singular}Service from "../../services/${singular}Service.js";

export default class ${modelClass}BaseController {
  static async crear(req, res) {
    try { const nuevo = await ${singular}Service.crear(req.body); res.status(201).json(nuevo); }
    catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al crear ${singular}", error }); }
  }

  static async obtenerTodos(req, res) {
    try { const lista = await ${singular}Service.obtenerTodos(); res.json(lista); }
    catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al obtener ${modelName}", error }); }
  }

  static async obtenerPorId(req, res) {
    try {
      const item = await ${singular}Service.obtenerPorId(req.params.id);
      if (!item) return res.status(404).json({ mensaje: "No encontrado" });
      res.json(item);
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al obtener ${singular}", error }); }
  }

  static async actualizar(req, res) {
    try {
      const item = await ${singular}Service.actualizar(req.params.id, req.body);
      if (!item) return res.status(404).json({ mensaje: "No encontrado" });
      res.json(item);
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al actualizar ${singular}", error }); }
  }

  static async eliminar(req, res) {
    try {
      const result = await ${singular}Service.eliminar(req.params.id);
      if (!result) return res.status(404).json({ mensaje: "No encontrado" });
      res.json({ mensaje: "${singular} eliminado correctamente" });
    } catch (error) { console.error(error); res.status(500).json({ mensaje: "Error al eliminar ${singular}", error }); }
  }
}
`;

  fs.writeFileSync(`${baseControllersPath}/${singular}BaseController.js`, baseControllerContent);

  // ----------------- CONTROLADOR DIRECTO -----------------
  const controllerContent = `// controllers/${modelName}Controller.js
import ${modelClass}BaseController from "./base/${singular}BaseController.js";
export default ${modelClass}BaseController;
`;

  fs.writeFileSync(`${controllersPath}/${modelName}Controller.js`, controllerContent);

  // ----------------- ROUTES -----------------
  const routesContent = `// routes/${modelName}Routes.js
import express from "express";
import ${modelClass}Controller from "../controllers/${modelName}Controller.js";

const router = express.Router();

router.get("/", ${modelClass}Controller.obtenerTodos);
router.get("/:id", ${modelClass}Controller.obtenerPorId);
router.post("/", ${modelClass}Controller.crear);
router.put("/:id", ${modelClass}Controller.actualizar);
router.delete("/:id", ${modelClass}Controller.eliminar);

export default router;
`;

  fs.writeFileSync(`${routesPath}/${modelName}Routes.js`, routesContent);

  console.log(`✅ CRUD generado para: ${modelName}`);
}

console.log("🎉 Todos los servicios, controladores base y rutas han sido generados correctamente.");
