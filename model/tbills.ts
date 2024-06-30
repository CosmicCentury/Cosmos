import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbManager";
import JoinSavings from "./jointSavings";
class Tbills extends Model {
  public id!: number;
  public entryDate!: number;
  public amount!: number;
}

Tbills.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    savingId: {
      type: DataTypes.INTEGER,
    },
    entryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
    },
  },
  { modelName: "tbills", sequelize: sequelize, timestamps: false }
);

Tbills.belongsTo(JoinSavings, { foreignKey: "savingId" });

export default Tbills;
