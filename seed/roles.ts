import Roles from "../model/roles";
import { RolesType } from "../model/typings";

const SeedRoles = async () => {
  const roles: RolesType[] = [
    {
      name: "SUPERADMIN",
    },
    {
      name: "ADMIN",
    },
    {
      name: "USER",
    },
  ];
  await Roles.bulkCreate(roles);
};

export default SeedRoles;
