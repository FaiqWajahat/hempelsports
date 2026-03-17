import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { pin } = await request.json();

    if (!pin || pin !== process.env.ADMIN_PIN) {
      return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });

    // Set auth cookie — not HttpOnly so the client page can read it
    // for a seamless redirect without a full page reload.
    response.cookies.set("admin_auth", process.env.ADMIN_PIN, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
