// src/app/products/new/page.tsx
"use client"; // ← フォーム送信でブラウザ側の動きを使うため

import { useState } from "react";

export default function NewProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [status, setStatus] = useState<null | "loading" | "ok" | string>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    // 数値変換
    const numericPrice =
      typeof price === "string" ? Number(price.trim()) : price;

    // 簡単な入力チェック
    if (!name.trim() || !numericPrice || numericPrice <= 0) {
      setStatus("名前と正しい数字の値段が必要です。");
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), price: numericPrice }),
      });
      const json = await res.json();

      if (json.status === "OK") {
        setStatus("ok");
        setName("");
        setPrice("");
      } else {
        setStatus(json.message || "エラーが発生しました");
      }
    } catch (err: any) {
      setStatus(err.message || "通信エラー");
    }
  }

  return (
    <main style={{ padding: "1rem", maxWidth: 480 }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        商品を追加する
      </h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <label style={{ display: "grid", gap: "0.25rem" }}>
          <span>商品名</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例: Tシャツ"
              style={{
                padding: "0.6rem",
                border: "1px solid #ccc",
                borderRadius: 6,
              }}
              required
            />
        </label>

        <label style={{ display: "grid", gap: "0.25rem" }}>
          <span>価格 (数字)</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="例: 1980"
            style={{
              padding: "0.6rem",
              border: "1px solid #ccc",
              borderRadius: 6,
            }}
            required
            min={1}
          />
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            padding: "0.75rem 1rem",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {status === "loading" ? "送信中..." : "追加する"}
        </button>
      </form>

      {status === "ok" && (
        <p style={{ color: "green", marginTop: "1rem" }}>追加しました！</p>
      )}
      {status &&
        status !== "ok" &&
        status !== "loading" && (
          <p style={{ color: "red", marginTop: "1rem" }}>{status}</p>
        )}

      <p style={{ marginTop: "2rem" }}>
        → <a href="/products">商品一覧へ戻る</a>
      </p>
    </main>
  );
}