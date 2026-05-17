/**
 * 中文：活动记录组件，展示双人共同活动日志，不泄露私密任务内容。
 * English: Activity log component showing shared activity history without leaking private task content.
 */

import type { ActivityLogEntry } from '../../types/economy';
import type { User } from '../../types/user';

interface ActivityLogProps {
  logs: ActivityLogEntry[];
  users: User[];
}

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} 分钟前`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} 小时前`;
  return `${Math.floor(hours / 24)} 天前`;
}

export default function ActivityLog({ logs, users }: ActivityLogProps) {
  const publicLogs = logs.filter((l) => l.isPublic);

  return (
    <div className="flex flex-col gap-3">
      {publicLogs.length === 0 ? (
        <div className="text-center py-8 text-gray-400 text-sm">
          还没有活动记录<br />
          <span className="text-xs">完成任务后会出现在这里</span>
        </div>
      ) : (
        [...publicLogs].reverse().map((log) => {
          const user = users.find((u) => u.id === log.actorId);
          return (
            <div key={log.id} className="flex items-start gap-3 bg-white rounded-2xl p-3 shadow-sm">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: user?.avatarColor ?? '#e5e7eb' }}
              >
                {log.actorName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-700">{log.actorName}</p>
                <p className="text-sm text-gray-600 mt-0.5">{log.action}</p>
                <p className="text-xs text-gray-400 mt-1">{timeAgo(log.timestamp)}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
