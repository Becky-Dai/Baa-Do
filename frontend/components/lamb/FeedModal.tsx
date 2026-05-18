/**
 * 中文：喂食模态框，让用户从库存中选择食物喂给 Mochi。
 * English: Feed modal allowing the user to select food from inventory to feed Mochi.
 */

import Modal from '../ui/Modal';
import Button from '../ui/Button';
import type { InventoryItem } from '../../types/economy';
import { useT } from '../../contexts/LangContext';

interface FeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: InventoryItem[];
  lambName?: string;
  onFeed: (item: InventoryItem) => void;
}

const itemEmoji: Record<string, string> = {
  '普通干草': '🌾',
  '优质苜蓿': '🍀',
  '莓果零食': '🍓',
};

export default function FeedModal({ isOpen, onClose, items, lambName = 'Mochi', onFeed }: FeedModalProps) {
  const t = useT();

  function handleFeed(item: InventoryItem) {
    onFeed(item);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('feed.title', { name: lambName })}>
      {items.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-4xl mb-2">🪹</p>
          <p className="text-sm text-gray-500">{t('feed.empty')}</p>
          <p className="text-xs text-gray-400 mt-1">{t('feed.emptyHint')}</p>
          <Button variant="ghost" size="sm" onClick={onClose} className="mt-4">
            {t('feed.close')}
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
                  {item.fullnessBoost > 0 && `+${item.fullnessBoost} ${t('feed.fullness')} `}
                  {item.moodBoost > 0 && `+${item.moodBoost} ${t('feed.mood')} `}
                  {item.bondBoost > 0 && `+${item.bondBoost} ${t('feed.bond')}`}
                </p>
              </div>
              <span className="text-xs text-gray-400">x{item.quantity}</span>
            </button>
          ))}
          <Button variant="ghost" size="sm" onClick={onClose} className="mt-1">
            {t('feed.cancel')}
          </Button>
        </div>
      )}
    </Modal>
  );
}
