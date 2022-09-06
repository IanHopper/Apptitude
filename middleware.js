import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request) {
  console.log('Potato')
  return NextResponse.redirect(new URL('/about', request.url))
}