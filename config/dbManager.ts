import { Sequelize } from "sequelize";

const db = "scheduler";
const username = "raphael";
const password = "Alienthe123";
const timezone = "UTC";

const sequelize = new Sequelize(db, username, password, {
  host: "192.168.50.130",
  dialect: "mysql",
  timezone: "+08:00",
});

const init = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { init, sequelize };
