import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbManager";
import bcrypt from "bcrypt";

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
  public loginAt!: Date;
  public status!: string;
  validatePassword!: (password: string, hash: string) => Promise<boolean>;

  // validatePassword(password: string): string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
    firstName: {
      type: new DataTypes.STRING(45),
      allowNull: true,
    },
    lastName: {
      type: new DataTypes.STRING(45),
      allowNull: true,
    },
    loginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: new DataTypes.STRING(1),
      allowNull: true,
    },
  },
  {
    modelName: "users",
    sequelize,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

User.prototype.validatePassword = async (password, hash) =>
  await bcrypt.compare(password, hash);

export default User;
