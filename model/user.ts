import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbManager";
import bcrypt from "bcrypt";

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
  public loginAt!: Date;
  public status!: string;
  public phoneNumber!: string;
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
    email: {
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
    },
    lastName: {
      type: new DataTypes.STRING(45),
    },
    loginAt: {
      type: DataTypes.DATE,
    },
    status: {
      type: new DataTypes.STRING(1),
    },
    phoneNumber: {
      type: new DataTypes.STRING(20),
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
