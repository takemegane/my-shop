"use client";

import { useState } from "react";

type Props = {
  id: number;
  initialName: string;
  initialPrice: number;
};

export default function EditForm({ id, initialName, initialPrice }: Props) {
  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState<number | "">(initialPrice);
  const [status, setStatus] = useState<null | "loading" | "ok" | string>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const numericPrice =
      typeof price === "string" ? Number(price.trim()) : price;

    if (!name.trim() || !numericPrice || numericPrice <= 0) {
      setStatus("名前と正しい数字の値段が必要です。");
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name: name.trim(),
          price: numericPrice,
        }),
      });
      const json = await res.json();
      if (json.status === "OK") {
        setStatus("ok");
      } else {
        setStatus(json.message || "更新エラー");
      }
    } catch (err: any) {
      setStatus(err.message || "通信エラー");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
      <label style={{ display: "grid", gap: "0.25rem" }}>
        <span>商品名</span>
        <input
          value={name}
            onChange={(e) => setName(e.target.value)}
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
          onChange={(e) =>
            setPrice(e.target.value === "" ? "" : Number(e.target.value))
          }
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
        {status === "loading" ? "更新中..." : "更新する"}
      </button>

      {status === "ok" && (
        <p style={{ color: "green" }}>更新しました！一覧に戻って確認してください。</p>
      )}
      {status &&
        status !== "ok" &&
        status !== "loading" && (
          <p style={{ color: "red" }}>{status}</p>
        )}
    </form>
  );
}