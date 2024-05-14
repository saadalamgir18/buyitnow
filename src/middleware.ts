import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
export default withAuth(async function middleware(request: NextRequest) {
  console.log("in middleware");
});
export const config = {
  matcher: ["/me"],
};
