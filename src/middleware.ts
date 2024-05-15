import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
export default withAuth(
  async function middleware(request: NextRequest) {
    console.log("in middleware");
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = {
  matcher: ["/me", "/api/address"],
};
