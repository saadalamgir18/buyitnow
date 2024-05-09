import { NextRequest, NextResponse } from "next/server";
import productModel from "../../../../../db/connectDB";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("params.id: ", params.id);
  const product = await productModel.findById(params.id);
  if (product) {
    return NextResponse.json({
      product,
    });
  } else {
    return NextResponse.json({
      message: "No products is there",
    });
  }
}
