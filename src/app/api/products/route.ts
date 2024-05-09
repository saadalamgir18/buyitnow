import { NextRequest, NextResponse } from "next/server";
import productModel from "../../../../db/connectDB";
import { productSchema } from "@/store/types/types";

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
  const products = await productModel.find();

  return NextResponse.json({
    products,
  });
}
