/**
 * 中文：喂食模态框，让用户从库存中选择食物喂给 Mochi。
 * English: Feed modal allowing the user to select food from inventory to feed Mochi.
 */

import Modal from '../ui/Modal';
import Button from '../ui/Button';
import type { InventoryItem } from '../../types/economy';

interface FeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: InventoryItem[];
  onFeed: (item: InventoryItem) => void;
}

const itemEmoji: Record<string, string> = {
  'Basic Hay': '🌾',
  'Premium Clover': '🍀',
  'Berry Treat': '🍓',
};

export default function FeedModal({ isOpen, onClose, items, onFeed }: FeedModalProps) {
  function handleFeed(item: InventoryItem) {
    onFeed(item);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="喂 Mochi 🐑">
      {items.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-4xl mb-2">🪹</p>
          <p className="text-sm text-gray-500">库存空空如也</p>
          <p className="text-xs text-gray-400 mt-1">完成任务获得食物吧！</p>
          <Button variant="ghost" size="sm" onClick={onClose} className="mt-4">
            关闭
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleFeed(item)}
              className="flex items-center gap-3 bg-amber-50 hover:bg-amber-100 rounded-2xl px-4 py-3 text-left transition-colors w-full"
            >
              <span className="text-2xl">{itemEmoji[item.name] ?? '🍽️'}</span>
              <div className="flex-1">
                <p className="font-semibold text-sm text-amber-800">{item.name}</p>
                <p className="text-xs text-gray-500">
                  {item.fullnessBoost > 0 && `+${item.fullnessBoost} 饱腹 `}
                  {item.moodBoost > 0 && `+${item.moodBoost} 心情 `}
                  {item.bondBoost > 0 && `+${item.bondBoost} Bond`}
                </p>
              </div>
              <span className="text-xs text-gray-400">x{item.quantity}</span>
            </button>
          ))}
          <Button variant="ghost" size="sm" onClick={onClose} className="mt-1">
            取消
          </Button>
        </div>
      )}
    </Modal>
  );
}
