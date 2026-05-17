/**
 * 中文：Lamb Setup 页面的小羊创建表单组件。
 * English: Lamb creation form component for the Lamb Setup page.
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';
import type { LambAppearance } from '../../types/lamb';

const appearances: { value: LambAppearance; label: string; emoji: string; desc: string }[] = [
  { value: 'white', label: '白色羊羔', emoji: '🐑', desc: 'White Lamb' },
  { value: 'milktea', label: '奶茶色羊羔', emoji: '🐏', desc: 'Milktea Lamb' },
  { value: 'curly', label: '卷毛羊羔', emoji: '🐑', desc: 'Curly Lamb' },
];

export default function LambSetupForm() {
  const [lambName, setLambName] = useState('Mochi');
  const [appearance, setAppearance] = useState<LambAppearance>('milktea');
  const [buddyConfirmed] = useState(true); // Mock: 搭子已确认
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    if (!lambName.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  }

  return (
    <form onSubmit={handleConfirm} className="flex flex-col gap-5">
      {/* Lamb name */}
      <div>
        <label className="block text-sm font-semibold text-green-800 mb-1">
          给小羊起名字 Name your lamb
        </label>
        <input
          type="text"
          value={lambName}
          onChange={(e) => setLambName(e.target.value)}
          placeholder="例如：Mochi"
          className="w-full border border-green-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 bg-white"
          maxLength={12}
          required
        />
      </div>

      {/* Appearance selector */}
      <div>
        <p className="text-sm font-semibold text-green-800 mb-2">选择外观 Choose appearance</p>
        <div className="grid grid-cols-3 gap-2">
          {appearances.map((a) => (
            <button
              key={a.value}
              type="button"
              onClick={() => setAppearance(a.value)}
              className={`flex flex-col items-center gap-1 rounded-2xl py-3 border-2 transition-all ${
                appearance === a.value
                  ? 'border-green-400 bg-green-50'
                  : 'border-transparent bg-gray-50 hover:bg-green-50'
              }`}
            >
              <span className="text-3xl">{a.emoji}</span>
              <span className="text-xs text-green-700 font-medium">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Buddy status */}
      <div className="bg-amber-50 rounded-2xl p-3 flex items-center gap-3">
        <span className="text-xl">{buddyConfirmed ? '✅' : '⏳'}</span>
        <div>
          <p className="text-xs font-semibold text-amber-800">
            {buddyConfirmed ? 'Alice 已确认小羊' : 'Alice 正在确认中...'}
          </p>
          <p className="text-xs text-amber-600">
            {buddyConfirmed ? '双方都准备好了！' : '等待搭子确认小羊外观'}
          </p>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isLoading || !lambName.trim() || !buddyConfirmed}
      >
        {isLoading ? '创建中...' : `确认创建 ${lambName || '小羊'} 🐑`}
      </Button>
    </form>
  );
}
