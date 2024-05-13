import zod from "zod";
export const productSchema = zod.object({
  name: zod.string(),
  description: zod.string(),
  price: zod.number(),
  seller: zod.string(),
  stock: zod.number(),
  category: zod.string(),
});

export const UserZodSchema = zod.object({
  name: zod.string(),
  email: zod
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: zod.string().min(6, { message: "This field has to be filled." }),
});
