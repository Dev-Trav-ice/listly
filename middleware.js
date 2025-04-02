import { NextResponse } from "next/server";

export function middleware(req) {
  const response = NextResponse.next();

  response.headers.append("Access-Control-Allow-Credentials", "true");
  response.headers.append("Access-Control-Allow-Origin", "*"); // Allow all origins or set a specific origin
  response.headers.append(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS"
  );
  response.headers.append(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return response;
}

export const config = {
  matcher: "/api/:path*", // Apply middleware to API routes
};
