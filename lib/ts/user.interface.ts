export interface IUserResults {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface IUsersPaginationDetails {
  page: number;
  size: number;
  filter?: string;
  sort?: string;
}
