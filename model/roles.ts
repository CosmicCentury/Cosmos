import { DataTypes, Model, ModelAttributes } from "sequelize";
import { sequelize } from "../config/dbManager";
import bcrypt from "bcrypt";
import { RolesType } from "./typings";

class Roles extends Model implements RolesType {
  public id!: number;
  public name!: string;
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
    modelName: "roles",
    sequelize,
  }
);

export default Roles;
