import { InferSchemaType, Schema, model } from "mongoose";
import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://saadalamgir18:x9K1XLrpMsXwwth2@cluster0.vqpdxmb.mongodb.net/buyitnow"
);

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
  },
  description: {
    type: String,
    required: [true, "Please enter producst description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter producst price"],
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter producst category"],
    enum: {
      values: [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Sports",
      ],
      message: "Please select correct category",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter product seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter producst stock"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export type Product = InferSchemaType<typeof productSchema>;
const productModel =
  mongoose.models.productModel ||
  mongoose.model<Product>("productModel", productSchema);
export default productModel;
