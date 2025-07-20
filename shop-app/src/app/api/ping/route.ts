import { NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase";

export async function GET() {
  const supabase = createSupabaseRouteClient();
  const { error } = await supabase.from("products").select("id").limit(1);

  if (error) {
    return NextResponse.json(
      { status: "NG", message: error.message },
      { status: 500 }
    );
  }
  return NextResponse.json({ status: "OK" });
}