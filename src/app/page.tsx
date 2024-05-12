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

  useEffect(() => {
    // const urlParams = {
    //   keyword: searchParams.get("keyword"),
    //   page: searchParams.get("page"),
    //   category: searchParams.get("category"),
    //   "ratings[gte]": searchParams.get("ratings"),
    //   "price[gte]": searchParams.get("min"),
    //   "price[lte]": searchParams.get("max"),
    // };
    const urlParams = {
      keyword: searchParams.get("keyword"),
      page: searchParams.get("page"),
      ...(searchParams.get("category") && {
        category: searchParams.get("category"),
      }),
      ...(searchParams.get("ratings") && {
        "ratings[gte]": searchParams.get("ratings"),
      }), // Include only if ratings is present
      ...(searchParams.get("min") && { "price[gte]": searchParams.get("min") }), // Include only if min is present
      ...(searchParams.get("max") && { "price[lte]": searchParams.get("max") }), // Include only if max is present
    };
    const filter_urlParams = Object.fromEntries(
      Object.entries(urlParams).filter(([key, value]) => value !== undefined)
    );
    const searchQuery = queryString.stringify(filter_urlParams);
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
  }, [searchParams]);

  // const productsData = await getData();
  return <ListProducts productsData={productsData} />;
}
