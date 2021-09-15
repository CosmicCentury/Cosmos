interface IPaginationResult {
  limit: number;
  offset: number;
}

export const getPagination = (
  page?: number,
  size?: number
): IPaginationResult => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

interface IDbData {
  count: number;
  rows: any[];
}

interface IPaginationDataResult {
  totalItems: number;
  data: any;
  totalPages: number;
  currentPage: number;
}

export const getPagingData = (
  dbData: IDbData,
  page: number,
  limit: number
): IPaginationDataResult => {
  const { count: totalItems, rows: data } = dbData;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, data, totalPages, currentPage };
};
