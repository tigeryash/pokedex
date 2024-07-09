import { NextRequest, NextResponse } from "next/server";
import { PokemonClient } from "pokenode-ts";

export async function GET(req: NextRequest) {
  const P = new PokemonClient();
  const name = req.nextUrl.searchParams.get("name");
  if (name) {
    let response = await P.getPokemonByName(name);
    return NextResponse.json({ response });
  }
  return NextResponse.json({ error: "No name provided" });
}
