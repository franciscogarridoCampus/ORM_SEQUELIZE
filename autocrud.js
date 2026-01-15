// autocrud.js
import fs from "fs";
import path from "path";

const modelsPath = "./models";
const servicesPath = "./services";
const controllersPath = "./controllers";
const baseControllersPath = "./controllers/base";
const routesPath = "./routes";

// Crear carpetas necesarias
[servicesPath, controllersPath, baseControllersPath, routesPath].forEach(dir =>
  fs.mkdirSync(dir, { recursive: true })
);

// Leer modelos
const models = fs.readdirSync(modelsPath)
  .filter(f => f.endsWith(".js") && f !== "init-models.js");

for (const modelFile of models) {
  const modelName = path.basename(modelFile, ".js"); // productos
  const ModelClass = modelName.charAt(0).toUpperCase() + modelName.slice(1); // Productos
  const singular = modelName.replace(/s$/, ""); // producto

  /* =====================================================
     SERVICE (SE REGENERA SIEMPRE)
  ===================================================== */
  const serviceContent = `// services/${modelName}Service.js
import { sequelize } from "../config/db.js";
import ${modelName} from "../models/${modelFile}.js";
import { DataTypes } from "sequelize";

const ${singular} = ${modelName}.init(sequelize, DataTypes);

export const create = (data) => ${singular}.create(data);
export const findAll = () => ${singular}.findAll();
export const findById = (id) => ${singular}.findByPk(id);
export const update = async (id, data) => {
  const item = await ${singular}.findByPk(id);
  if (!item) return null;
  return item.update(data);
};
export const remove = async (id) => {
  const item = await ${singular}.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return true;
};
`;

  fs.writeFileSync(`${servicesPath}/${modelName}Service.js`, serviceContent);

  /* =====================================================
     BASE CONTROLLER (SE REGENERA SIEMPRE)
  ===================================================== */
  const baseControllerContent = `// controllers/base/${modelName}BaseController.js
import * as Service from "../../services/${modelName}Service.js";

export const create = async (req, res) => {
  try {
    const result = await Service.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear ${singular}", error });
  }
};

export const findAll = async (req, res) => {
  try {
    const result = await Service.findAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar ${modelName}", error });
  }
};

export const findOne = async (req, res) => {
  try {
    const result = await Service.findById(req.params.id);
    if (!result) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener ${singular}", error });
  }
};

export const update = async (req, res) => {
  try {
    const result = await Service.update(req.params.id, req.body);
    if (!result) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar ${singular}", error });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await Service.remove(req.params.id);
    if (!result) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "${singular} eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar ${singular}", error });
  }
};
`;

  fs.writeFileSync(
    `${baseControllersPath}/${modelName}BaseController.js`,
    baseControllerContent
  );

  /* =====================================================
     CONTROLLER EXTENDIDO (SOLO SI NO EXISTE)
  ===================================================== */
  const controllerPath = `${controllersPath}/${modelName}Controller.js`;

  if (!fs.existsSync(controllerPath)) {
    const controllerContent = `// controllers/${modelName}Controller.js
import * as Base from "./base/${modelName}BaseController.js";

// Aquí puedes añadir lógica personalizada
export const create = Base.create;
export const findAll = Base.findAll;
export const findOne = Base.findOne;
export const update = Base.update;
export const remove = Base.remove;
`;
    fs.writeFileSync(controllerPath, controllerContent);
  }

  /* =====================================================
     ROUTES (SE REGENERA SIEMPRE)
  ===================================================== */
  const routeContent = `// routes/${modelName}Routes.js
import express from "express";
import {
  create,
  findAll,
  findOne,
  update,
  remove
} from "../controllers/${modelName}Controller.js";

const router = express.Router();

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
`;

  fs.writeFileSync(`${routesPath}/${modelName}Routes.js`, routeContent);

console.log(`✅ AutoCRUD generado para: ${modelName}`);
}

console.log("🎉 AutoCRUD MVC reducido generado correctamente.");
