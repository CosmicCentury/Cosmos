import { Sequelize } from "sequelize";
import User from "../model/user";
import Roles from "../model/roles";
import UserRole from "../model/userRole";

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USERNAME!,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    timezone: "+08:00",
    define: {
      freezeTableName: true,
    },
    // logging: false,
  }
);

const init = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: false });
    console.log("All models have been synchronised.");

    console.log(sequelize.models);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { init, sequelize };
