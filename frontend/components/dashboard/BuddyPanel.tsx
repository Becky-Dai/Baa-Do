/**
 * 中文：Dashboard Buddy 面板，展示搭子信息、Bond 等级和活动记录。
 * English: Dashboard Buddy panel showing buddy info, Bond levels, and activity log.
 */

import ActivityLog from '../buddy/ActivityLog';
import type { User } from '../../types/user';
import type { ActivityLogEntry } from '../../types/economy';
import { useT } from '../../contexts/LangContext';

interface BuddyPanelProps {
  currentUser: User;
  buddyUser: User | null;
  activityLogs: ActivityLogEntry[];
  allUsers: User[];
  lambName?: string;
}

const glassCard: React.CSSProperties = {
  backdropFilter: 'blur(20px) saturate(160%)',
  WebkitBackdropFilter: 'blur(20px) saturate(160%)',
  backgroundColor: 'rgba(255,255,255,0.35)',
  border: '1px solid rgba(255,255,255,0.55)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
};

function BondCard({ user, isCurrentUser }: { user: User; isCurrentUser: boolean }) {
  const t = useT();
  const bondPercent = Math.min(100, (user.bondWithLamb / 300) * 100);
  return (
    <div className="rounded-2xl p-4 flex items-center gap-3" style={glassCard}>
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0"
        style={{ backgroundColor: user.avatarColor }}
      >
        {user.name[0]}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-green-900">{user.name}</p>
          {isCurrentUser && (
            <span className="text-xs bg-green-100/70 text-green-700 px-1.5 py-0.5 rounded-full">{t('buddy.you')}</span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 bg-white/40 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-pink-300 transition-all"
              style={{ width: `${bondPercent}%` }}
            />
          </div>
          <span className="text-xs text-pink-500 font-semibold">{t('buddy.bondLv', { lv: user.bondLevel })}</span>
        </div>
      </div>
    </div>
  );
}

export default function BuddyPanel({
  currentUser,
  buddyUser,
  activityLogs,
  allUsers,
  lambName = 'Mochi',
}: BuddyPanelProps) {
  const t = useT();
  return (
    <div className="flex flex-col gap-4">
      {/* Bond cards */}
      <section>
        <h3 className="text-sm font-bold text-green-800 mb-2">{t('buddy.bondTitle', { lamb: lambName })}</h3>
        <div className="flex flex-col gap-2">
          <BondCard user={currentUser} isCurrentUser />
          {buddyUser && <BondCard user={buddyUser} isCurrentUser={false} />}
        </div>
      </section>

      {/* Activity log */}
      <section>
        <h3 className="text-sm font-bold text-green-800 mb-2">{t('buddy.logTitle')}</h3>
        <ActivityLog logs={activityLogs} users={allUsers} />
      </section>
    </div>
  );
}
