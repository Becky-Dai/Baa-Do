/**
 * 中文：库存模态框，分食物和装饰两个分类，装饰物品可选中后进入放置模式。
 * English: Inventory modal with food and decoration tabs; selecting a decoration item enters placement mode.
 */
'use client';
import { useState } from 'react';
import Modal from './Modal';
import type { InventoryItem } from '../../types/economy';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: InventoryItem[];
  defaultTab?: 'food' | 'decoration';
  lambName?: string;
  onFeed: (item: InventoryItem) => void;
  onPlaceDecoration: (item: InventoryItem) => void;
}

const itemEmoji: Record<string, string> = {
  '普通干草': '🌾',
  '优质苜蓿': '🍀',
  '莓果零食': '🍓',
  '石头': '🪨',
  '小花': '🌸',
  '木桩': '🪵',
};

export default function InventoryModal({
  isOpen, onClose, items, defaultTab = 'food', lambName = 'Mochi', onFeed, onPlaceDecoration,
}: InventoryModalProps) {
  const [tab, setTab] = useState<'food' | 'decoration'>(defaultTab);

  const foodItems = items.filter((i) => i.type === 'food');
  const decoItems = items.filter((i) => i.type === 'decoration');

  function handleFeed(item: InventoryItem) {
    onFeed(item);
    onClose();
  }

  function handlePlace(item: InventoryItem) {
    onPlaceDecoration(item);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🧺 背包">
      {/* Tab bar */}
      <div className="flex gap-1 mb-4 bg-gray-100 rounded-xl p-1">
        {(['food', 'decoration'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
              tab === t ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t === 'food' ? `🍀 食物` : `🪨 装饰`}
          </button>
        ))}
      </div>

      {tab === 'food' && (
        foodItems.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">背包里没有食物了</p>
        ) : (
          <div className="flex flex-col gap-2">
            {foodItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleFeed(item)}
                className="flex items-center gap-3 bg-amber-50 hover:bg-amber-100 rounded-2xl px-4 py-3 text-left transition-colors w-full"
              >
                <span className="text-2xl">{itemEmoji[item.name] ?? '🍽️'}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-amber-800">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.fullnessBoost > 0 && `+${item.fullnessBoost} 饱食度 `}
                    {item.moodBoost > 0 && `+${item.moodBoost} 心情 `}
                    {item.bondBoost > 0 && `+${item.bondBoost} 亲密度`}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-gray-400">x{item.quantity}</span>
                  <span className="text-xs text-amber-600 font-semibold">喂 {lambName}</span>
                </div>
              </button>
            ))}
          </div>
        )
      )}

      {tab === 'decoration' && (
        decoItems.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">还没有装饰物品</p>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-400 mb-1">选择一件物品，然后点击草地放置</p>
            {decoItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handlePlace(item)}
                className="flex items-center gap-3 bg-green-50 hover:bg-green-100 rounded-2xl px-4 py-3 text-left transition-colors w-full"
              >
                <span className="text-2xl">{itemEmoji[item.name] ?? '🪴'}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-green-800">{item.name}</p>
                  <p className="text-xs text-gray-500">点击放置到场景中</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-gray-400">x{item.quantity}</span>
                  <span className="text-xs text-green-600 font-semibold">放置 →</span>
                </div>
              </button>
            ))}
          </div>
        )
      )}
    </Modal>
  );
}
