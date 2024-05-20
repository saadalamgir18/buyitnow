import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
export default withAuth(
  async function middleware(request: NextRequest) {
    const headers = new Headers(request.headers);
    headers.set("userid", request.nextauth.token.user._id);

    const resp = NextResponse.next({
      request: {
        headers,
      },
    });

    return resp;
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
