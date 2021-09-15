import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbManager";
import Roles from "./roles";
import User from "./user";

class UserRole extends Model {
  public id!: number;
  public roleId!: string;
  public userId!: string;
  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

UserRole.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleId: {
      type: new DataTypes.STRING(45),
    },
    userId: {
      type: new DataTypes.STRING(45),
    },
  },
  {
    tableName: "user_role",
    sequelize,
  }
);

UserRole.belongsTo(Roles, { foreignKey: "roleId" });
UserRole.belongsTo(User, { foreignKey: "userId" });

User.hasOne(UserRole);
Roles.hasOne(UserRole);

export default UserRole;
