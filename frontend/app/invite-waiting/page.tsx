/**
 * 中文：邀请等待页面，显示邀请码，等待搭子加入。
 * English: Invite waiting page showing the invite code while waiting for buddy.
 */

import Link from 'next/link';
import InviteWaitingPanel from '../../components/room/InviteWaitingPanel';

export default function InviteWaitingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50 flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-sm">
        <Link href="/" className="text-green-600 text-sm mb-6 inline-block">
          ← 返回首页
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-green-800">等待搭子</h1>
          <p className="text-sm text-gray-500 mt-1">Waiting for your buddy to join</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6">
          <InviteWaitingPanel />
        </div>
      </div>
    </main>
  );
}
