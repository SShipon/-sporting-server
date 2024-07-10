import QueryBuilder from '../../builder/QueryBuilder';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);

  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['name'];

  const ProductQuery = new QueryBuilder(Product.find(), query)
    .search(searchableFields)
    .fields()
    .pagination()
    .sort()
    .filter();

  const result = await ProductQuery.queryModel;

  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);

  return result;
};

// const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
//   const result = await Product.findByIdAndUpdate(id, payload, { new: true });

//   return result;
// };

export { createProductIntoDB, getAllProductsFromDB, getSingleProductFromDB };
