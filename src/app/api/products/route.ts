import { NextRequest, NextResponse } from "next/server";
import productModel from "../../../../db/models/products";
import { productSchema } from "@/store/types/types";
import ApiFilters from "@/utils/ApiFilters";
import dbConnect from "../../../../db/config/dbConnect";
dbConnect();
export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);
  const { success } = productSchema.safeParse(data);
  try {
    if (success) {
      const newData = await productModel.create(data);
      return NextResponse.json(newData);
    } else {
      return NextResponse.json({
        message: "Your input is not correct",
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: (error as { message: string }).message,
    });
  }
}

export async function GET(req: NextRequest) {
  const resPerPage = 2;
  const productsCount = await productModel.countDocuments();
  const apiFilters = new ApiFilters(
    productModel.find(),
    req.nextUrl.searchParams
  )
    .Search()
    .filter();
  let products = await apiFilters.query;
  const filterProductsCount = products.length;
  apiFilters.paginations(resPerPage);
  products = await apiFilters.query.clone();

  return NextResponse.json({
    productsCount,
    resPerPage,
    filterProductsCount,
    products,
  });
}
