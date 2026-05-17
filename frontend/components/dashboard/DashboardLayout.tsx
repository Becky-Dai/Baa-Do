/**
 * 中文：Dashboard 主布局组件，三栏并排展示 Today / Meadow / Buddy。
 * English: Dashboard main layout component showing Today, Meadow, and Buddy panels side by side.
 */

'use client';

import { useState } from 'react';
import FeedModal from '../lamb/FeedModal';
import TodayPanel from './TodayPanel';
import MeadowPanel from './MeadowPanel';
import BuddyPanel from './BuddyPanel';
import AddTaskModal from '../tasks/AddTaskModal';
import RewardModal from '../tasks/RewardModal';
import { useMockRoom } from '../../hooks/useMockRoom';
import { useMockLamb } from '../../hooks/useMockLamb';
import { useMockTasks } from '../../hooks/useMockTasks';
import { useMockInventory } from '../../hooks/useMockInventory';
import { calcPersonalReward, calcSharedReward } from '../../lib/rewardRules';
import { mockActivityLogs, mockMeadowElements, mockUsers } from '../../data/mockData';
import type { Task, TaskReward } from '../../types/task';

export default function DashboardLayout() {
  const [showFeedModal, setShowFeedModal] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [rewardTask, setRewardTask] = useState<Task | null>(null);
  const [rewardData, setRewardData] = useState<TaskReward | null>(null);

  const { room, currentUser, buddyUser } = useMockRoom();
  const { lamb, feedLamb, addLambExp } = useMockLamb();
  const { personalTasks, sharedTasks, completeTask, addTask } = useMockTasks();
  const { myItems, consumeItem, addItem } = useMockInventory();

  function handleCompleteTask(taskId: string) {
    const task = [...personalTasks, ...sharedTasks].find((t) => t.id === taskId);
    if (!task) return;

    completeTask(taskId);

    let reward: TaskReward;
    if (task.type === 'personal') {
      reward = calcPersonalReward(task.difficulty);
      addLambExp(reward.lambExp);
      if (reward.item) {
        const itemEffects: Record<string, { fullnessBoost: number; moodBoost: number; bondBoost: number }> = {
          'Basic Hay': { fullnessBoost: 15, moodBoost: 0, bondBoost: 0 },
          'Premium Clover': { fullnessBoost: 30, moodBoost: 5, bondBoost: 0 },
          'Berry Treat': { fullnessBoost: 0, moodBoost: 20, bondBoost: 5 },
        };
        addItem(reward.item, 'food', itemEffects[reward.item] ?? {});
      }
    } else {
      const alreadyCompleted = task.completedByIds.includes(currentUser.id);
      const willComplete = !alreadyCompleted && task.completedByIds.length === 1;
      if (!willComplete) return;
      reward = calcSharedReward(task.difficulty);
    }

    setRewardTask(task);
    setRewardData(reward);
  }

  function handleUncompleteTask(taskId: string) {
    completeTask(taskId);
  }

  function handleFeed(item: typeof myItems[0]) {
    feedLamb(item);
    consumeItem(item.id);
  }

  const placedElements = mockMeadowElements.filter((e) => e.isPlaced);
  const moodEmoji: Record<string, string> = { happy:'😊', normal:'😌', hungry:'😢', sad:'😔' };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">

      {/* ── Meadow background (fixed, full page) ── */}
      <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(to bottom, #87ceeb 0%, #b8e4f7 40%, #6dbf6d 60%, #3a9e3a 100%)' }}>
        {/* Sky clouds */}
        <div className="absolute top-[8%] left-[15%] text-5xl opacity-60 select-none">☁️</div>
        <div className="absolute top-[12%] right-[20%] text-4xl opacity-50 select-none">☁️</div>
        {/* Placed meadow elements — left of Mochi */}
        {placedElements.map((el, i) => (
          <div
            key={el.id}
            className="absolute flex flex-col items-center gap-0.5"
            style={{
              bottom: '15%',
              left: `${6 + i * 7}%`,
            }}
          >
            <span className="text-4xl select-none">{el.emoji}</span>
          </div>
        ))}
        {/* Mochi in grass, center-bottom */}
        <div className="absolute bottom-[14%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <button
            onClick={() => setShowFeedModal(true)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="relative">
              <span className="text-[10rem] select-none drop-shadow-lg group-hover:scale-110 transition-transform inline-block leading-none">
                {lamb.appearance === 'milktea' ? '🐏' : '🐑'}
              </span>
              <span className="absolute -top-2 -right-2 text-2xl">{moodEmoji[lamb.moodState]}</span>
            </div>
            <span className="text-sm font-bold text-white drop-shadow">{lamb.name}</span>
            <span className="text-xs text-white/80 drop-shadow">Lv.{lamb.level} · 点击喂食</span>
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/30 backdrop-blur-md px-5 py-3 flex items-center justify-between sticky top-0 z-10 border-b border-white/30" style={{ backdropFilter: 'blur(16px) saturate(160%)', WebkitBackdropFilter: 'blur(16px) saturate(160%)' }}>
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: currentUser.avatarColor }}
          >
            {currentUser.name[0]}
          </div>
          <span className="text-sm font-semibold text-green-900">{currentUser.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-amber-700 font-semibold bg-amber-100/60 px-2 py-1 rounded-full">
            🪙 {currentUser.baaCoins}
          </span>
        </div>
      </header>

      {/* Three-column layout */}
      <div className="flex flex-1 gap-0 divide-x divide-white/20">
        {/* Today */}
        <section className="flex-1 overflow-y-auto px-4 py-4">
          <h2 className="text-xs font-bold text-white drop-shadow uppercase tracking-widest mb-3 text-center">Today</h2>
          <TodayPanel
            personalTasks={personalTasks}
            sharedTasks={sharedTasks}
            currentUserId={currentUser.id}
            buddyName={buddyUser?.name}
            onComplete={handleCompleteTask}
            onUncomplete={handleUncompleteTask}
            onAddTask={() => setShowAddTask(true)}
          />
        </section>

        {/* Meadow info — transparent center column, Mochi is in background */}
        <section className="flex-1 overflow-y-auto px-4 py-4">
          <h2 className="text-xs font-bold text-white drop-shadow uppercase tracking-widest mb-3 text-center">Meadow</h2>
          <MeadowPanel room={room} meadowElements={mockMeadowElements} lamb={lamb} onFeed={() => setShowFeedModal(true)} />
        </section>

        {/* Buddy */}
        <section className="flex-1 overflow-y-auto px-4 py-4">
          <h2 className="text-xs font-bold text-white drop-shadow uppercase tracking-widest mb-3 text-center">Buddy</h2>
          <BuddyPanel
            currentUser={currentUser}
            buddyUser={buddyUser}
            activityLogs={mockActivityLogs}
            allUsers={mockUsers}
          />
        </section>
      </div>

      {/* Right-side floating dock */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        {[
          { emoji: '🧺', label: '库存' },
          { emoji: '🏠', label: '草地' },
        ].map(({ emoji, label }) => (
          <button
            key={label}
            className="w-14 h-14 rounded-full flex flex-col items-center justify-center gap-0.5"
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              backgroundColor: 'rgba(255,255,255,0.28)',
              border: '1px solid rgba(255,255,255,0.55)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)',
            }}
          >
            <span className="text-2xl leading-none">{emoji}</span>
            <span className="text-[10px] text-white font-semibold drop-shadow">{label}</span>
          </button>
        ))}
      </div>

      {/* Modals */}
      <FeedModal
        isOpen={showFeedModal}
        onClose={() => setShowFeedModal(false)}
        items={myItems}
        onFeed={handleFeed}
      />

      <AddTaskModal
        isOpen={showAddTask}
        onClose={() => setShowAddTask(false)}
        onAdd={addTask}
      />

      <RewardModal
        isOpen={!!rewardTask}
        onClose={() => { setRewardTask(null); setRewardData(null); }}
        task={rewardTask}
        reward={rewardData}
      />
    </div>
  );
}
