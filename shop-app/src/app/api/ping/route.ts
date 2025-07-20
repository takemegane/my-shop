// src/app/api/ping/route.ts
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  // “auth.users” テーブルは必ず存在するので読みに行くだけ
  const { error } = await supabase
  .schema("public")        // ★ スキーマを明示
  .from("products")
  .select("id")
  .limit(1);
  if (error) {
    return NextResponse.json({ status: "NG", message: error.message }, { status: 500 });
  }
  return NextResponse.json({ status: "OK" });
}