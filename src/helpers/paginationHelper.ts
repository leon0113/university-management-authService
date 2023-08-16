import { SortOrder } from 'mongoose';

// receive type
type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};
// return type
type IReturn = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};

const calculatePagination = (options: IOptions): IReturn => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);

  const skip = (page - 1) * limit;

  // Queries
  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelper = {
  calculatePagination,
};
