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
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = body.name;
    const price = body.price;

    // かんたんなチェック（足りなければエラー返す）
    if (!name || typeof price !== "number") {
      return new Response(
        JSON.stringify({ status: "NG", message: "name と price が必要です" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Supabase に追加
    const { error } = await supabase
      .from("products")
      .insert([{ name, price }]);

    if (error) {
      return new Response(
        JSON.stringify({ status: "NG", message: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ status: "OK" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (e: any) {
    return new Response(
      JSON.stringify({ status: "NG", message: "JSON の形が正しくありません" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}