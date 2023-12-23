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
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "user_role",
    sequelize: sequelize,
    timestamps: false,
  }
);

UserRole.belongsTo(Roles, { foreignKey: "roleId" });
UserRole.belongsTo(User, { foreignKey: "userId" });

User.hasOne(UserRole);
Roles.hasOne(UserRole);

export default UserRole;
