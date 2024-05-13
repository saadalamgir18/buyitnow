import { NextRequest, NextResponse } from "next/server";
import User from "../../../../db/user";
import { UserZodSchema } from "@/store/types/types";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { success } = UserZodSchema.safeParse(data);
  if (!success) {
    return NextResponse.json({
      message: "Your input is not correct",
      status: 400,
    });
  }
  const { name, email, password } = data;
  const isExist = await User.findOne({ email: email });
  if (isExist) {
    return NextResponse.json({
      message: "user already exist",
      status: 403,
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  return NextResponse.json({
    user,
    status: 200,
  });
}
