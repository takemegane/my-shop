import { NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase";

/** 一覧 (GET) */
export async function GET() {
  const supabase = createSupabaseRouteClient();
  const { data, error } = await supabase
    .from("products")
    .select("id, name, price")
    .limit(100);

  if (error) {
    return NextResponse.json(
      { status: "NG", message: error.message },
      { status: 500 }
    );
  }
  return NextResponse.json(data);
}

/** 追加 (POST) */
export async function POST(request: Request) {
  const supabase = createSupabaseRouteClient();
  try {
    const body = await request.json();
    const { name, price } = body;
    if (!name || typeof price !== "number") {
      return new Response(
        JSON.stringify({ status: "NG", message: "name と price が必要です" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const { error } = await supabase
      .from("products")
      .insert([{ name, price }]);
    if (error) {
      return new Response(
        JSON.stringify({ status: "NG", message: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ status: "OK" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(
      JSON.stringify({
        status: "NG",
        message: "JSON の形が正しくありません",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}

/** 更新 (PUT) */
export async function PUT(request: Request) {
  const supabase = createSupabaseRouteClient();
  try {
    const body = await request.json();
    const { id, name, price } = body;
    if (!id || (!name && typeof price !== "number")) {
      return new Response(
        JSON.stringify({
          status: "NG",
            message: "id と、変更したい name か price のどちらかが必要です",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const updateFields: Record<string, any> = {};
    if (name) updateFields.name = name;
    if (typeof price === "number") updateFields.price = price;

    const { error } = await supabase
      .from("products")
      .update(updateFields)
      .eq("id", id);

    if (error) {
      return new Response(
        JSON.stringify({ status: "NG", message: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ status: "OK" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(
      JSON.stringify({
        status: "NG",
        message: "JSON の形が正しくありません",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}

/** 削除 (DELETE) */
export async function DELETE(request: Request) {
  const supabase = createSupabaseRouteClient();
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) {
      return new Response(
        JSON.stringify({ status: "NG", message: "id が必要です" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      return new Response(
        JSON.stringify({ status: "NG", message: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ status: "OK" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(
      JSON.stringify({
        status: "NG",
        message: "JSON の形が正しくありません",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}