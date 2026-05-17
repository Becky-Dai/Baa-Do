/**
 * 中文：等待搭子加入的页面组件，显示邀请码。
 * English: Waiting panel component showing the invite code while waiting for buddy to join.
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';
import { mockRoom } from '../../data/mockData';

export default function InviteWaitingPanel() {
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const inviteCode = mockRoom.inviteCode;

  function copyCode() {
    navigator.clipboard.writeText(inviteCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="text-5xl animate-pulse">🐑</div>

      <div>
        <p className="text-sm text-gray-500 mb-1">房间邀请码</p>
        <div className="flex items-center gap-2 bg-green-50 rounded-2xl px-6 py-3">
          <span className="text-3xl font-bold font-mono text-green-700 tracking-widest">
            {inviteCode}
          </span>
          <button
            onClick={copyCode}
            className="text-green-400 hover:text-green-600 text-lg transition-colors"
            title="复制"
          >
            {copied ? '✅' : '📋'}
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 max-w-xs">
        把这个邀请码发给搭子，他们加入后<br />
        你们就可以一起创建小羊了 🌿
      </p>

      <div className="w-full bg-amber-50 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-amber-300 animate-pulse" />
          <span className="text-sm text-amber-700">等待搭子加入中...</span>
        </div>
      </div>

      {/* Mock: 模拟搭子已加入 */}
      <Button
        variant="secondary"
        size="md"
        onClick={() => router.push('/lamb-setup')}
        className="w-full"
      >
        模拟搭子已加入 →
      </Button>
    </div>
  );
}
