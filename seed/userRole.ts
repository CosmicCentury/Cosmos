import { Transaction } from "sequelize";
import { UserRoleType } from "../model/typings";
import UserRole from "../model/userRole";

const SeedUserRole = async (
  userRoles: UserRoleType[],
  t: Transaction
): Promise<void> => {
  await UserRole.bulkCreate(userRoles, { transaction: t });

  t.commit();
};

export default SeedUserRole;
