import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    timezone: "+08:00",
    define: {
      timestamps: false,
    },
    // logging: false,
  }
);

const init = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync({ force: true });
    console.log("All models have been synchronised.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { init, sequelize };
