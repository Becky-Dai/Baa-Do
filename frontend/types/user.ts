/**
 * 中文：BaaDo Web Preview 用户类型定义。
 * English: User type definitions for BaaDo Web Preview.
 */

export type UserId = string;

export interface User {
  id: UserId;
  name: string;
  avatarColor: string;
  baaCoins: number;
  bondWithLamb: number;
  bondLevel: number;
}
