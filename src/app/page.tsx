"use client";
import axios from "axios";
import ListProducts from "@/components/products/ListProducts";
import { useEffect, useState } from "react";

// const getData = async () => {
//   const { data } = await axios.get("http://localhost:3000/api/products");
//   return data;
// };
export default function Home() {
  const [productsData, setProducts] = useState([]);
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/products",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const productsData = await getData();
  return <ListProducts productsData={productsData} />;
}
