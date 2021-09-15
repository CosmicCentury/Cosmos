import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbManager";
import bcrypt from "bcrypt";

class Roles extends Model {
  public id!: number;
  public name!: string;
  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

Roles.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "roles",
    sequelize,
  }
);

export default Roles;
