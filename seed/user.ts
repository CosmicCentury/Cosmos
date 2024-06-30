import { sequelize } from "../config/dbManager";
import { UserType } from "../model/typings";
import User from "../model/user";
import SeedUserRole from "./userRole";

const SeedUsers = async () => {
  const t = await sequelize.transaction();
  const user: UserType[] = [
    {
      email: "superadmin@gmail.com",
      password: "superadmin123",
      firstName: "admin",
      lastName: "user",
      loginAt: "2024-01-02T15:47:22.926Z",
      status: "A",
      phoneNumber: "94593346",
    },
    {
      email: "admin@gmail.com",
      password: "admin123",
      firstName: "admin",
      lastName: "user",
      loginAt: "2024-01-02T15:47:22.926Z",
      status: "A",
      phoneNumber: "94593346",
    },
    {
      email: "user@gmail.com",
      password: "user123",
      firstName: "normal",
      lastName: "user",
      loginAt: "2024-01-02T15:47:22.926Z",
      status: "A",
      phoneNumber: "94593346",
    },
  ];
  const resultUsers = await User.bulkCreate(user, {
    individualHooks: true,
    transaction: t,
  });

  const userRole = resultUsers.map((user, i) => ({
    userId: user.id,
    roleId: i + 1,
  }));

  await SeedUserRole(userRole, t);
};

export default SeedUsers;
