import SeedRoles from "./roles";
import SeedUsers from "./user";

const SeedDatabase = async () => {
  await SeedRoles();
  await SeedUsers();
};

export default SeedDatabase;
