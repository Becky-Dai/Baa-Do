/**
 * 中文：加入 Pair Room 页面。
 * English: Join Pair Room page for BaaDo Web Preview.
 */

import Link from 'next/link';
import JoinRoomForm from '../../components/room/JoinRoomForm';

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50 flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-sm">
        <Link href="/" className="text-green-600 text-sm mb-6 inline-block">
          ← 返回
        </Link>

        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌿</div>
          <h1 className="text-2xl font-bold text-green-800">加入房间</h1>
          <p className="text-sm text-gray-500 mt-1">Join your buddy&apos;s Pair Room</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6">
          <JoinRoomForm />
        </div>
      </div>
    </main>
  );
}
