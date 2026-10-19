import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isPortalRoute = pathname.startsWith("/portal");
  const isAuthRoute = pathname.startsWith("/auth");

  if (isAdminRoute) {
    if (!session || session.user.role !== "admin") {
      const url = new URL("/auth/signin", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (isPortalRoute) {
    if (!session || session.user.role !== "customer") {
      const url = new URL("/auth/signin", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (isAuthRoute && session) {
    const role = session.user.role;
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl") || "/";
    if (role === "admin" && callbackUrl === "/") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (role === "customer" && callbackUrl === "/") {
      return NextResponse.redirect(new URL("/portal", request.url));
    }
    return NextResponse.redirect(new URL(callbackUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*", "/auth/:path*"],
};
