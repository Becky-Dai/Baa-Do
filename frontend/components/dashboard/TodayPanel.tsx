/**
 * 中文：Dashboard Today 面板，展示个人任务和共同任务列表。
 * English: Dashboard Today panel showing personal and shared task lists.
 */

import TaskCard from '../tasks/TaskCard';
import Button from '../ui/Button';
import type { Task } from '../../types/task';
import { useT } from '../../contexts/LangContext';

interface TodayPanelProps {
  personalTasks: Task[];
  sharedTasks: Task[];
  currentUserId: string;
  buddyName?: string;
  onComplete: (taskId: string) => void;
  onUncomplete: (taskId: string) => void;
  onAddTask: () => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  onPin: (taskId: string) => void;
}

export default function TodayPanel({
  personalTasks,
  sharedTasks,
  currentUserId,
  buddyName,
  onComplete,
  onUncomplete,
  onAddTask,
  onDelete,
  onEdit,
  onPin,
}: TodayPanelProps) {
  const t = useT();
  const sortByPin = (a: Task, b: Task) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
  const pendingPersonal = personalTasks.filter((t) => t.status !== 'completed').sort(sortByPin);
  const donePersonal = personalTasks.filter((t) => t.status === 'completed');

  return (
    <div className="flex flex-col gap-4">
      {/* Personal tasks */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-green-800">{t('today.personal')}</h3>
          <span className="text-xs text-gray-400">
            {t('today.doneCount', { done: donePersonal.length, total: personalTasks.length })}
          </span>
        </div>

        {pendingPersonal.length === 0 && donePersonal.length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-sm bg-gray-50 rounded-2xl">
            {t('today.emptyPersonal')}<br />
            <span className="text-xs">{t('today.emptyPersonalHint')}</span>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {pendingPersonal.map((task) => (
              <TaskCard key={task.id} task={task} currentUserId={currentUserId} buddyName={buddyName} onComplete={onComplete} onUncomplete={onUncomplete} onDelete={onDelete} onEdit={onEdit} onPin={onPin} />
            ))}
            {donePersonal.map((task) => (
              <TaskCard key={task.id} task={task} currentUserId={currentUserId} buddyName={buddyName} onComplete={onComplete} onUncomplete={onUncomplete} onDelete={onDelete} onEdit={onEdit} onPin={onPin} />
            ))}
          </div>
        )}
      </section>

      {/* Shared tasks */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-green-800">{t('today.shared')}</h3>
          <span className="text-xs text-gray-400">
            {t('today.doneCount', { done: sharedTasks.filter((t) => t.status === 'completed').length, total: sharedTasks.length })}
          </span>
        </div>

        {[...sharedTasks].sort(sortByPin).length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-sm bg-gray-50 rounded-2xl">
            {t('today.emptyShared')}<br />
            <span className="text-xs">{t('today.emptySharedHint')}</span>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {[...sharedTasks].sort(sortByPin).map((task) => (
              <TaskCard key={task.id} task={task} currentUserId={currentUserId} buddyName={buddyName} onComplete={onComplete} onUncomplete={onUncomplete} onDelete={onDelete} onEdit={onEdit} onPin={onPin} />
            ))}
          </div>
        )}
      </section>

      <Button
        variant="secondary"
        size="md"
        onClick={onAddTask}
        className="w-full"
      >
        {t('today.addBtn')}
      </Button>
    </div>
  );
}
