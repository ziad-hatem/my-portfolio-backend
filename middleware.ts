import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });

    // Get the pathname of the request
    const path = req.nextUrl.pathname;

    // If the user is authenticated and trying to access auth pages
    if (token && path.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // If the user is not authenticated and trying to access protected pages
    if (!token && path.startsWith("/dashboard")) {
      const callbackUrl = encodeURIComponent(path);
      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${callbackUrl}`, req.url)
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);

    // In case of an error, redirect to the error page
    return NextResponse.redirect(
      new URL("/auth/error?error=middleware", req.url)
    );
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
