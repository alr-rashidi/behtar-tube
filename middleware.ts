import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user is not signed in and the current path is /account redirect the user to /login
  if (!user && req.nextUrl.pathname.startsWith("/subscribes")) {
    return NextResponse.redirect(new URL("/", req.url));
  } // if user is not signed in and the current path is /account redirect the user to /login
  if (!user && req.nextUrl.pathname.startsWith("/account")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  // if user is signed in and the current path is /login redirect the user to /account
  if (user && req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/login", "/account/:path*", "/subscribes"],
};
