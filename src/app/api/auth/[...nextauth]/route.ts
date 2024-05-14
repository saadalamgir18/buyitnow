import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../../db/user";
import bcrypt from "bcryptjs";
// import
type CredentialType = {
  email: string;
  password: string;
};
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
      async authorize(credentials?: CredentialType) {
        if (credentials) {
          const user = await User.findOne({
            email: credentials.email,
          }).select("+password");

          if (!user) {
            //   throw new Error("Invalid email or password");
            return null;
          }
          const isPasswordMatched = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordMatched) {
            return null;
          }
          return user;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      delete session?.user?.password;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
export const GET = handler;
export const POST = handler;
