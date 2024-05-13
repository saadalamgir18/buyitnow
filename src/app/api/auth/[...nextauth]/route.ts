import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../../db/user";
import bcrypt from "bcryptjs";
// import
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "email",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        request
      ) {
        console.log(credentials?.email);
        const user_password: string = credentials?.password;
        const user_email = credentials?.email;
        const { password, email, name, avatar } = await User.findOne({
          email: user_email,
        }).select("+password");
        const user = { email, name, avatar };
        console.log(user);
        if (!email) {
          //   throw new Error("Invalid email or password");
          return null;
        }
        console.log(email);
        const isPasswordMatched = await bcrypt.compare(user_password, password);
        if (!isPasswordMatched) {
          throw new Error("Invalid email or password");
          return null;
        }
        return user;
      },
    }),
  ],
  //   pages: {
  //     signIn: "/signin",
  //   },
  secret: process.env.NEXTAUTH_SECRET,
});
export const GET = handler;
export const POST = handler;
