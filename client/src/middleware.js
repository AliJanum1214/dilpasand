import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl;
  const adminAuthenticated = request.cookies.get("adminAuthenticated")?.value;

  if (url.pathname.startsWith("/admin") && adminAuthenticated !== "true") {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
