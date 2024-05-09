import ProductDetails from "@/components/products/ProductDetails";
import axios from "axios";
import React from "react";
const getProductDeatils = async (id: string) => {
  const { data } = await axios.get(`http://localhost:3000/api/products/${id}`);
  return data?.product;
};
async function ProductDetailsPage({ params }: any) {
  const product = await getProductDeatils(params.id);
  return <ProductDetails product={product} />;
}

export default ProductDetailsPage;
