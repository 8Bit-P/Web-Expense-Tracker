import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req, res) {
  // return early if url isn't supposed to be protected

  const token = await getToken({ req, secret: process.env.SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
  }

  // If user is authenticated, continue.
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/addExpenses',"/api/getExpenses","/api/getUser","/api/removeExpense","/api/updateExpense","/api/updateMonthlyLimit"]

}