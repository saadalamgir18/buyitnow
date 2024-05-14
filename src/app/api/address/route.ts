import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../db/config/dbConnect";
import Address from "../../../../db/models/addres";
import { AddressZodSchema } from "@/store/types/types";
dbConnect();

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { success } = AddressZodSchema.safeParse(data);

  if (!success) {
    return NextResponse.json({
      message: "input is not corect",
    });
  } else {
    const address = await Address.create(data);
    return NextResponse.json({
      address,
      message: "Address created succefully",
    });
  }
}

export async function GET(req: NextRequest) {
  const address = await Address.find();
  return NextResponse.json({
    address,
  });
}
