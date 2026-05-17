/**
 * 中文：创建 Pair Room 页面。
 * English: Create Pair Room page for BaaDo Web Preview.
 */

import Link from 'next/link';
import CreateRoomForm from '../../components/room/CreateRoomForm';

export default function CreateRoomPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50 flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-sm">
        <Link href="/" className="text-green-600 text-sm mb-6 inline-block">
          ← 返回
        </Link>

        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🐑</div>
          <h1 className="text-2xl font-bold text-green-800">创建房间</h1>
          <p className="text-sm text-gray-500 mt-1">Create your Pair Room</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6">
          <CreateRoomForm />
        </div>
      </div>
    </main>
  );
}
