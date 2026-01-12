import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "api_rest_db",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
    logging: false
  }
);
