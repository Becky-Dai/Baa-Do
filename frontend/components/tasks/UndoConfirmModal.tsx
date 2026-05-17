/**
 * 中文：撤销任务完成的确认弹窗，风格与奖励弹窗一致。
 * English: Confirmation modal for undoing task completion, styled like the reward modal.
 */

import Modal from '../ui/Modal';
import Button from '../ui/Button';
import type { Task } from '../../types/task';

interface UndoConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  task: Task | null;
}

export default function UndoConfirmModal({ isOpen, onClose, onConfirm, task }: UndoConfirmModalProps) {
  if (!task) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="text-5xl">🔄</div>
        <h2 className="text-lg font-bold text-gray-800">确定要撤销吗？</h2>
        <p className="text-sm text-gray-500">
          「{task.visibility === 'private' ? '私密任务' : task.title}」将恢复为未完成状态。
        </p>
        <div className="w-full bg-amber-50 rounded-2xl p-4">
          <p className="text-xs text-amber-700">
            Mochi 说：没关系，随时可以重新来过 🐑
          </p>
        </div>
        <div className="flex gap-3 w-full">
          <Button variant="ghost" size="md" onClick={onClose} className="flex-1">
            取消
          </Button>
          <Button variant="primary" size="md" onClick={() => { onConfirm(); onClose(); }} className="flex-1">
            确定撤销
          </Button>
        </div>
      </div>
    </Modal>
  );
}
