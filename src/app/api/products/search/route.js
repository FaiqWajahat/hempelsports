import { NextResponse } from "next/server";
import { searchProductsByQuery } from "@/data/catalog";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    const results = await searchProductsByQuery(query);

    return NextResponse.json({ results: results.slice(0, 8) });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { message: "Search failed", error: error.message },
      { status: 500 }
    );
  }
}
