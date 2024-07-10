import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).trim(),
    brand: z.string({ required_error: 'Brand is required' }).trim(),
    category: z.string({ required_error: 'Category is required' }).trim(),
    description: z.string({ required_error: 'Description is required' }),
    image: z.string({ required_error: 'Image is required' }),
    price: z.number({ required_error: 'Price is required' }),
    rating: z.number({ required_error: 'Rating is required' }),
    stock: z.number({ required_error: 'Stock is required' }),
  }),
});

export { createProductValidationSchema };
