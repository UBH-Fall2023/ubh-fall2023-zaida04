import { authMiddleware } from "@clerk/nextjs";
import { NextFetchEvent, NextRequest } from "next/server";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent,
) {
  if (req.nextUrl.pathname === "/" || req.nextUrl.pathname.startsWith("/api")) {
    return;
  }
  return authMiddleware({})(req, event);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"],
};
