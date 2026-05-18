/**
 * 中文：Dashboard Today 面板，展示个人任务和共同任务列表。
 * English: Dashboard Today panel showing personal and shared task lists.
 */

import TaskCard from '../tasks/TaskCard';
import Button from '../ui/Button';
import type { Task } from '../../types/task';

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
  const sortByPin = (a: Task, b: Task) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
  const pendingPersonal = personalTasks.filter((t) => t.status !== 'completed').sort(sortByPin);
  const donePersonal = personalTasks.filter((t) => t.status === 'completed');

  return (
    <div className="flex flex-col gap-4">
      {/* Personal tasks */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-green-800">个人任务</h3>
          <span className="text-xs text-gray-400">{donePersonal.length}/{personalTasks.length} 完成</span>
        </div>

        {pendingPersonal.length === 0 && donePersonal.length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-sm bg-gray-50 rounded-2xl">
            今天还没有个人任务<br />
            <span className="text-xs">点击下方按钮添加吧！</span>
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
          <h3 className="text-sm font-bold text-blue-700">共同任务</h3>
          <span className="text-xs text-gray-400">
            {sharedTasks.filter((t) => t.status === 'completed').length}/{sharedTasks.length} 完成
          </span>
        </div>

        {[...sharedTasks].sort(sortByPin).length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-sm bg-gray-50 rounded-2xl">
            还没有共同任务<br />
            <span className="text-xs">一起做点什么吧！</span>
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
        + 添加任务
      </Button>
    </div>
  );
}
