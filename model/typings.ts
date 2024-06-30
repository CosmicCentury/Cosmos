type UserType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  loginAt: string;
  status: string;
  phoneNumber: string;
};
type RolesType = { name: string };
type UserRoleType = {
  roleId: number;
  userId: number;
};

export { UserType, RolesType, UserRoleType };
