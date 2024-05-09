import zod from "zod";
export const productSchema = zod.object({
  name: zod.string(),
  description: zod.string(),
  price: zod.number(),
  seller: zod.string(),
  stock: zod.number(),
  category: zod.string(),
});
