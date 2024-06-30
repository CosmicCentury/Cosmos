import { DATE, DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbManager";
import User from "./user";

class JoinSavings extends Model {
  public id!: number;
  public entryDate!: number;
}

JoinSavings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    entryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {},
    },
    amount: {
      type: DataTypes.FLOAT,
    },
  },
  { modelName: "join_savings", sequelize: sequelize, timestamps: false }
);

JoinSavings.belongsTo(User, { foreignKey: "userId" });

User.hasOne(JoinSavings);

export default JoinSavings;
