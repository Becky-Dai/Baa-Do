/**
 * 中文：任务完成奖励模态框，展示完成后获得的奖励内容。
 * English: Reward modal showing rewards earned after completing a task.
 */

import Modal from '../ui/Modal';
import Button from '../ui/Button';
import type { TaskReward } from '../../types/task';
import type { Task } from '../../types/task';

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  reward: TaskReward | null;
}

const itemEmoji: Record<string, string> = {
  'Basic Hay': '🌾',
  'Premium Clover': '🍀',
  'Berry Treat': '🍓',
};

export default function RewardModal({ isOpen, onClose, task, reward }: RewardModalProps) {
  if (!task || !reward) return null;

  const isShared = task.type === 'shared';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="text-5xl animate-bounce">🎉</div>
        <h2 className="text-lg font-bold text-green-800">任务完成！</h2>

        {isShared ? (
          <>
            <p className="text-sm text-gray-500">共同任务完成，草地成长了！</p>
            <div className="w-full bg-green-50 rounded-2xl p-4 space-y-2">
              <RewardRow emoji="🏡" label="草地经验" value={`+${reward.homeExp}`} />
              {reward.meadowElement && (
                <RewardRow
                  emoji="🌸"
                  label="解锁元素"
                  value={reward.meadowElement}
                />
              )}
            </div>
            <p className="text-xs text-green-600 bg-green-50 rounded-xl px-3 py-2">
              Mochi 说：两个人一起做到了，草地更漂亮了 🌿
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-500">Mochi 看到了你的努力！</p>
            <div className="w-full bg-amber-50 rounded-2xl p-4 space-y-2">
              {reward.item && (
                <RewardRow emoji={itemEmoji[reward.item] ?? '🎁'} label="获得物品" value={reward.item} />
              )}
              <RewardRow emoji="🪙" label="咩币" value={`+${reward.baaCoins}`} />
              <RewardRow emoji="⚡" label="小羊经验" value={`+${reward.lambExp}`} />
              <RewardRow emoji="💛" label="亲密度" value={`+${reward.bondIncrease}`} />
            </div>
            <p className="text-xs text-amber-600 bg-amber-50 rounded-xl px-3 py-2">
              Mochi 说：谢谢你，{reward.item ? `我收到了 ${reward.item}！` : '你真棒！'} 🐑
            </p>
          </>
        )}

        <Button onClick={onClose} size="md" className="w-full">
          太棒了！
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
