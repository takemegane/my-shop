// src/app/products/[id]/edit/page.tsx
import { supabase } from "@/lib/supabase";
import EditForm from "./EditForm";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const idNum = Number(params.id);

  if (Number.isNaN(idNum)) {
    return (
      <main style={{ padding: "1rem" }}>
        <p>不正な ID です。</p>
        <p>
          <a href="/products">商品一覧へ戻る</a>
        </p>
      </main>
    );
  }

  // 該当の商品を 1 件取得
  const { data, error } = await supabase
    .from("products")
    .select("id, name, price")
    .eq("id", idNum)
    .single();

  if (error) {
    return (
      <main style={{ padding: "1rem", color: "red" }}>
        取得エラー: {error.message}
        <p>
          <a href="/products">商品一覧へ戻る</a>
        </p>
      </main>
    );
  }

  if (!data) {
    return (
      <main style={{ padding: "1rem" }}>
        <p>商品が見つかりません。</p>
        <p>
          <a href="/products">商品一覧へ戻る</a>
        </p>
      </main>
    );
  }

  return (
    <main style={{ padding: "1rem", maxWidth: 480 }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        商品を編集：{data.name}
      </h1>
      <EditForm
        id={data.id}
        initialName={data.name}
        initialPrice={data.price as number}
      />
      <p style={{ marginTop: "2rem" }}>
        → <a href="/products">商品一覧へ戻る</a>
      </p>
    </main>
  );
}