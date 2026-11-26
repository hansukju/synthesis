import { NextResponse, type NextRequest } from "next/server";
import { getItem } from "@/lib/archive/catalog";

export function proxy(request: NextRequest) {
  const segment = request.nextUrl.pathname.split("/")[2];
  let slug: string;

  try {
    slug = decodeURIComponent(segment);
  } catch {
    slug = "";
  }

  if (getItem(slug)) return NextResponse.next();

  // A streamed not-found page can send its initial headers with status 200.
  return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
}

export const config = { matcher: "/item/:slug" };
