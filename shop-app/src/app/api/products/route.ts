// src/app/api/products/route.ts
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  // products テーブルから id, name, price を取得（最大 100 件）
  const { data, error } = await supabase
    .from("products")
    .select("id, name, price")
    .limit(100);

  if (error) {
    return NextResponse.json(
      { status: "NG", message: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json(data); // 例: [{ id:1, name:"Tシャツ", price:1980 }]
}