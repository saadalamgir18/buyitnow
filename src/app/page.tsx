"use client";
import axios from "axios";
import ListProducts from "@/components/products/ListProducts";
import { useEffect, useState } from "react";
import queryString from "query-string";
import { useSearchParams } from "next/navigation";
// const getData = async () => {
//   const { data } = await axios.get("http://localhost:3000/api/products");
//   return data;
// };
export default function Home() {
  const searchParams = useSearchParams();
  const [productsData, setProducts] = useState([]);
  console.log("URLSearchParams", searchParams.get("keyword"));
  const urlParams = {
    keyword: searchParams.get("keyword"),
    page: searchParams.get("page"),
  };
  const searchQuery = queryString.stringify(urlParams);

  useEffect(() => {
    console.log("searchQuery: ", searchQuery);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/products?${searchQuery}`,
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
  }, [searchQuery]);

  // const productsData = await getData();
  return <ListProducts productsData={productsData} />;
}
