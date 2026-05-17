/**
 * 中文：加入 Pair Room 的表单组件。
 * English: Form component for joining a Pair Room with an invite code.
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';

export default function JoinRoomForm() {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !code.trim()) return;

    // Mock: 只接受 MOCHI7 作为有效邀请码
    if (code.toUpperCase() !== 'MOCHI7') {
      setError('邀请码无效，请确认后重试。');
      return;
    }

    setError('');
    setIsLoading(true);
    setTimeout(() => {
      router.push('/lamb-setup');
    }, 600);
  }

  return (
    <form onSubmit={handleJoin} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-semibold text-green-800 mb-1">
          你的名字 Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例如：Alice"
          className="w-full border border-green-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 bg-white"
          maxLength={20}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-green-800 mb-1">
          邀请码 Invite Code
        </label>
        <input
          type="text"
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(''); }}
          placeholder="例如：MOCHI7"
          className="w-full border border-green-200 rounded-xl px-4 py-2.5 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-green-300 bg-white"
          maxLength={8}
          required
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

      <p className="text-xs text-gray-400 text-center">
        演示邀请码：<span className="font-mono font-semibold text-green-600">MOCHI7</span>
      </p>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isLoading || !name.trim() || !code.trim()}
      >
        {isLoading ? '加入中...' : '加入房间 🐑'}
      </Button>
    </form>
  );
}
