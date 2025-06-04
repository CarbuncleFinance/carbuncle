-- 基本的なスキーマ設定
CREATE SCHEMA IF NOT EXISTS public;

-- 通常のユーザーロールの設定
ALTER ROLE postgres SET search_path TO public;

-- 必要な拡張機能の有効化
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- テーブル作成
CREATE TABLE IF NOT EXISTS wallets (
  id uuid primary key default gen_random_uuid(),
  address text not null,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(address)
);

CREATE TABLE IF NOT EXISTS transactions (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid references wallets(id),
  tx_hash text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(tx_hash)
);
