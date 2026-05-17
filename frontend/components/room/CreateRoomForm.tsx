/**
 * 中文：创建 Pair Room 的表单组件。
 * English: Form component for creating a Pair Room.
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';

export default function CreateRoomForm() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setIsLoading(true);
    // Mock: 直接跳转到等待页
    setTimeout(() => {
      router.push('/invite-waiting');
    }, 600);
  }

  return (
    <form onSubmit={handleCreate} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-semibold text-green-800 mb-1">
          你的名字 Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例如：Beiqi"
          className="w-full border border-green-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 bg-white"
          maxLength={20}
          required
        />
      </div>

      <div className="bg-green-50 rounded-2xl p-4 text-sm text-green-700">
        <p className="font-semibold mb-1">创建后会发生什么？</p>
        <ul className="list-disc list-inside space-y-1 text-green-600">
          <li>生成一个邀请码，发给搭子</li>
          <li>搭子加入后，一起创建小羊</li>
          <li>开始两个人的 Todo 旅程</li>
        </ul>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isLoading || !name.trim()}>
        {isLoading ? '创建中...' : '创建房间 ✨'}
      </Button>
    </form>
  );
}
