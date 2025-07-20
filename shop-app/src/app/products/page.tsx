// src/app/products/page.tsx
import { supabase } from "@/lib/supabase";

export default async function ProductsPage() {
  // Supabase から products テーブルを取得
  const { data, error } = await supabase
    .from("products")
    .select("id, name, price")
    .limit(100);

  if (error) {
    return (
      <main style={{ padding: "1rem", color: "red" }}>
        エラー: {error.message}
      </main>
    );
  }

  return (
    <main style={{ padding: "1rem" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>商品一覧</h1>
      {(!data || data.length === 0) && <p>まだ商品がありません。</p>}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {data?.map((p) => (
          <li
            key={p.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "0.75rem",
              marginBottom: "0.5rem",
            }}
          >
            <strong>{p.name}</strong>
            <div>価格: {p.price}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}