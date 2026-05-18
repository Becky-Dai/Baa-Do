/**
 * 中文：任务完成奖励模态框，展示完成后获得的奖励内容。
 * English: Reward modal showing rewards earned after completing a task.
 */

import Modal from '../ui/Modal';
import Button from '../ui/Button';
import type { TaskReward } from '../../types/task';
import type { Task } from '../../types/task';
import { useT } from '../../contexts/LangContext';

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  reward: TaskReward | null;
}

const itemEmoji: Record<string, string> = {
  '普通干草': '🌾',
  '优质苜蓿': '🍀',
  '莓果零食': '🍓',
};

export default function RewardModal({ isOpen, onClose, task, reward }: RewardModalProps) {
  const t = useT();
  if (!task || !reward) return null;

  const isShared = task.type === 'shared';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="text-5xl animate-bounce">🎉</div>
        <h2 className="text-lg font-bold text-green-800">{t('reward.done')}</h2>

        {isShared ? (
          <>
            <p className="text-sm text-gray-500">{t('reward.meadowGrew')}</p>
            <div className="w-full bg-green-50 rounded-2xl p-4 space-y-2">
              <RewardRow emoji="🏡" label={t('reward.meadowExp')} value={`+${reward.homeExp}`} />
              {reward.meadowElement && (
                <RewardRow emoji="🌸" label={t('reward.unlock')} value={reward.meadowElement} />
              )}
            </div>
            <p className="text-xs text-green-600 bg-green-50 rounded-xl px-3 py-2">
              {t('reward.mochiShared')}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-500">{t('reward.lambSaw')}</p>
            <div className="w-full bg-amber-50 rounded-2xl p-4 space-y-2">
              {reward.item && (
                <RewardRow emoji={itemEmoji[reward.item] ?? '🎁'} label={t('reward.unlock')} value={reward.item} />
              )}
              <RewardRow emoji="🪙" label={t('reward.coins')} value={`+${reward.baaCoins}`} />
              <RewardRow emoji="⚡" label={t('reward.lambExp')} value={`+${reward.lambExp}`} />
              <RewardRow emoji="💛" label={t('reward.bond')} value={`+${reward.bondIncrease}`} />
            </div>
            <p className="text-xs text-amber-600 bg-amber-50 rounded-xl px-3 py-2">
              {reward.item
                ? t('reward.mochiItem', { item: reward.item })
                : t('reward.mochiNoItem')}
            </p>
          </>
        )}

        <Button onClick={onClose} size="md" className="w-full">
          {t('reward.awesome')}
        </Button>
      </div>
    </Modal>
  );
}

function RewardRow({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2 text-gray-600">
        <span>{emoji}</span>
        <span>{label}</span>
      </span>
      <span className="font-semibold text-green-700">{value}</span>
    </div>
  );
}
