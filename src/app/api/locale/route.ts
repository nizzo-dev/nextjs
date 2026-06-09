import { NextRequest, NextResponse } from "next/server";
import { isLocale } from "@/lib/i18n";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const locale = body?.locale;

  if (!locale || !isLocale(locale)) {
    return NextResponse.json({ success: false, message: "Invalid locale" }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}
