import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbManager";
import Roles from "./roles";
import User from "./user";
import { UserRoleType } from "./typings";

class UserRole extends Model implements UserRoleType {
  public id!: number;
  public roleId!: number;
  public userId!: number;
}

UserRole.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "user_role",
    sequelize: sequelize,
  }
);

UserRole.belongsTo(Roles, { foreignKey: "roleId" });
UserRole.belongsTo(User, { foreignKey: "userId" });

User.hasOne(UserRole);
Roles.hasOne(UserRole);

export default UserRole;
