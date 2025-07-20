// src/lib/supabase.ts
import {
  createServerComponentClient,
  createRouteHandlerClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

/**
 * サーバーコンポーネント（/products など page.tsx 内）用
 */
export function createSupabaseServerComponentClient() {
  return createServerComponentClient({ cookies });
}

/**
 * Route Handler（/api/... の route.ts 内）用
 */
export function createSupabaseRouteClient() {
  return createRouteHandlerClient({ cookies });
}

/**
 * クライアントコンポーネント（フォーム等ブラウザ側）用
 */
export function createSupabaseBrowserClient() {
  return createClientComponentClient();
}