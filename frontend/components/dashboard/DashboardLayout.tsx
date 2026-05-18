/**
 * 中文：Dashboard 主布局组件，三栏并排展示 Today / Meadow / Buddy。
 * English: Dashboard main layout component showing Today, Meadow, and Buddy panels side by side.
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import FeedModal from '../lamb/FeedModal';
import TodayPanel from './TodayPanel';
import MeadowPanel from './MeadowPanel';
import BuddyPanel from './BuddyPanel';
import AddTaskModal from '../tasks/AddTaskModal';
import RewardModal from '../tasks/RewardModal';
import UndoConfirmModal from '../tasks/UndoConfirmModal';
import { useMockRoom } from '../../hooks/useMockRoom';
import { useMockLamb } from '../../hooks/useMockLamb';
import { useMockTasks } from '../../hooks/useMockTasks';
import { useMockInventory } from '../../hooks/useMockInventory';
import { calcPersonalReward, calcSharedReward } from '../../lib/rewardRules';
import { mockMeadowElements, mockUsers } from '../../data/mockData';
import { useMockActivityLog } from '../../hooks/useMockActivityLog';
import type { Task, TaskReward } from '../../types/task';
import { LangProvider, useLang, useT } from '../../contexts/LangContext';
import type { LangCode } from '../../lib/i18n/translations';
import { SheepSceneWrapper, SHEEP_MOOD_MAP } from '../sheep/SheepSceneWrapper';
import type { SheepMood } from '../sheep/SheepModel';

const LANGUAGES = [
  { code: 'zh-CN', label: '简体中文', short: '简中' },
  { code: 'zh-TW', label: '繁體中文', short: '繁中' },
  { code: 'en',    label: 'English',  short: 'EN'   },
  { code: 'ko',    label: '한국어',   short: 'KR'   },
  { code: 'ja',    label: '日本語',   short: 'JP'   },
  { code: 'es',    label: 'Español',  short: 'ES'   },
];

function LangSelector() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === lang)!;

  function handleOpen() {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 6, right: window.innerWidth - r.right });
    }
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !btnRef.current?.contains(t)) setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const dropdown = open ? createPortal(
    <div
      ref={menuRef}
      style={{
        position: 'fixed', top: pos.top, right: pos.right, zIndex: 9999,
        width: 140, borderRadius: 16, overflow: 'hidden',
        background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.13)',
      }}
    >
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          onClick={() => { setLang(l.code as LangCode); setOpen(false); }}
          className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ${
            l.code === lang ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span>{l.label}</span>
          {l.code === lang && <span className="text-green-500 text-xs">✓</span>}
        </button>
      ))}
    </div>,
    document.body
  ) : null;

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleOpen}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-green-900 transition-colors hover:bg-white/40"
        style={{
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255,255,255,0.25)',
          border: '1px solid rgba(255,255,255,0.5)',
        }}
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M7 1.5C7 1.5 5 4 5 7s2 5.5 2 5.5M7 1.5C7 1.5 9 4 9 7s-2 5.5-2 5.5M1.5 7h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        {current.short}
      </button>
      {dropdown}
    </>
  );
}

function SheepSign({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex gap-8 mb-1">
        <div className="w-2 h-2 rounded-full bg-amber-900/60 shadow-inner" />
        <div className="w-2 h-2 rounded-full bg-amber-900/60 shadow-inner" />
      </div>
      <div
        className="px-6 py-2 rounded-sm relative"
        style={{
          background: 'linear-gradient(180deg, #c8922a 0%, #a06820 40%, #b87c2e 60%, #8a5a18 100%)',
          boxShadow: '0 3px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,220,120,0.4), inset 0 -1px 0 rgba(0,0,0,0.2)',
          border: '1px solid #7a4e10',
        }}
      >
        <div className="absolute inset-0 rounded-sm overflow-hidden pointer-events-none opacity-20">
          {[20, 40, 60, 80].map((top) => (
            <div key={top} className="absolute w-full h-px bg-amber-900" style={{ top: `${top}%` }} />
          ))}
        </div>
        <span
          className="relative text-sm font-bold tracking-widest"
          style={{ color: '#fde68a', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

const SHEEP_HAPPY_MS = 2500;

function DashboardContent() {
  const t = useT();
  const [showFeedModal, setShowFeedModal] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [rewardTask, setRewardTask] = useState<Task | null>(null);
  const [rewardData, setRewardData] = useState<TaskReward | null>(null);
  const [undoTask, setUndoTask] = useState<Task | null>(null);

  // Sheep interaction state (managed here so the DOM click zone can trigger it)
  const [sheepMoodOverride, setSheepMoodOverride] = useState<SheepMood | null>(null);
  const [sheepCelebKey, setSheepCelebKey] = useState(0);
  const sheepRevertTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { room, currentUser, buddyUser } = useMockRoom();
  const { lamb, feedLamb, addLambExp } = useMockLamb();
  const { personalTasks, sharedTasks, completeTask, addTask, deleteTask, updateTask, pinTask } = useMockTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { myItems, consumeItem, addItem } = useMockInventory();
  const { logs, appendTaskComplete, appendFeed, removeByTaskId } = useMockActivityLog();

  function handleSheepAreaClick() {
    if (sheepRevertTimer.current) clearTimeout(sheepRevertTimer.current);
    setSheepMoodOverride('happy');
    setSheepCelebKey((k) => k + 1);
    sheepRevertTimer.current = setTimeout(() => setSheepMoodOverride(null), SHEEP_HAPPY_MS);
  }

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
          '普通干草': { fullnessBoost: 15, moodBoost: 0, bondBoost: 0 },
          '优质苜蓿': { fullnessBoost: 30, moodBoost: 5, bondBoost: 0 },
          '莓果零食': { fullnessBoost: 0, moodBoost: 20, bondBoost: 5 },
        };
        addItem(reward.item, 'food', itemEffects[reward.item] ?? {});
      }
      appendTaskComplete(task, currentUser.name);
    } else {
      const alreadyCompleted = task.completedByIds.includes(currentUser.id);
      if (alreadyCompleted) return;
      const willComplete = task.completedByIds.length === 1;
      // Log partial completion immediately (before full completion check)
      appendTaskComplete(task, currentUser.name);
      if (!willComplete) return;
      reward = calcSharedReward(task.difficulty);
    }

    setRewardTask(task);
    setRewardData(reward);
  }

  function handleUncompleteTask(taskId: string) {
    const task = [...personalTasks, ...sharedTasks].find((t) => t.id === taskId);
    if (task) setUndoTask(task);
  }

  function confirmUndo(taskId: string) {
    completeTask(taskId);
    removeByTaskId(taskId);
  }

  function handleEditTask(taskId: string) {
    const task = [...personalTasks, ...sharedTasks].find((t) => t.id === taskId);
    if (task) setEditingTask(task);
  }

  function handleSaveEdit(params: Parameters<typeof addTask>[0]) {
    if (!editingTask) return;
    updateTask(editingTask.id, params);
    setEditingTask(null);
  }

  const itemNameToKey: Record<string, string> = {
    '普通干草': 'item.hay',
    '优质苜蓿': 'item.clover',
    '莓果零食': 'item.berry',
  };

  function handleFeed(item: typeof myItems[0]) {
    feedLamb(item);
    consumeItem(item.id);
    appendFeed(lamb.name, itemNameToKey[item.name] ?? item.name, currentUser.name);
  }

  const placedElements = mockMeadowElements.filter((e) => e.isPlaced);

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
        {/* Mochi in grass, center-bottom — 3D sheep scene */}
        <SheepSceneWrapper
          displayMood={sheepMoodOverride ?? SHEEP_MOOD_MAP[lamb.moodState]}
          celebrationKey={sheepCelebKey}
          lambName={lamb.name}
          lambLevel={lamb.level}
          onFeedClick={() => setShowFeedModal(true)}
        />
      </div>

      {/* Transparent click zone over the sheep — sits above the background but captures clicks to the sheep area */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 cursor-pointer"
        style={{ width: 260, height: 340, zIndex: 5 }}
        onClick={handleSheepAreaClick}
        aria-label="Pet the sheep"
      />

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
        <div className="flex items-center gap-2">
          {([{ emoji: '🧺', label: t('header.inventory') }, { emoji: '🏠', label: t('header.meadow') }] as { emoji: string; label: string }[]).map(({ emoji, label }) => (
            <button
              key={label}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-green-900 transition-colors hover:bg-white/40"
              style={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                backgroundColor: 'rgba(255,255,255,0.25)',
                border: '1px solid rgba(255,255,255,0.5)',
              }}
            >
              <span>{emoji}</span>
              <span>{label}</span>
            </button>
          ))}
          <span className="text-xs text-amber-700 font-semibold bg-amber-100/60 px-2 py-1 rounded-full">
            🪙 {currentUser.baaCoins}
          </span>
          <LangSelector />
        </div>
      </header>

      {/* Three-column layout */}
      <div className="flex flex-1 gap-0 divide-x divide-white/20">
        {/* Today */}
        <section className="flex-1 overflow-y-auto px-4 py-4">
          <SheepSign label={t('col.today')} />
          <TodayPanel
            personalTasks={personalTasks}
            sharedTasks={sharedTasks}
            currentUserId={currentUser.id}
            buddyName={buddyUser?.name}
            onComplete={handleCompleteTask}
            onUncomplete={handleUncompleteTask}
            onAddTask={() => setShowAddTask(true)}
            onDelete={deleteTask}
            onEdit={handleEditTask}
            onPin={pinTask}
          />
        </section>

        {/* Meadow info — transparent center column, Mochi is in background */}
        <section className="flex-1 overflow-y-auto px-4 py-4">
          <SheepSign label={t('col.meadow')} />
          <MeadowPanel room={room} meadowElements={mockMeadowElements} lamb={lamb} onFeed={() => setShowFeedModal(true)} />
        </section>

        {/* Buddy */}
        <section className="flex-1 overflow-y-auto px-4 py-4">
          <SheepSign label={t('col.buddy')} />
          <BuddyPanel
            currentUser={currentUser}
            buddyUser={buddyUser}
            activityLogs={logs}
            allUsers={mockUsers}
            lambName={lamb.name}
          />
        </section>
      </div>

      {/* Modals */}
      <FeedModal
        isOpen={showFeedModal}
        onClose={() => setShowFeedModal(false)}
        items={myItems}
        onFeed={handleFeed}
      />

      <AddTaskModal
        key="add"
        isOpen={showAddTask}
        onClose={() => setShowAddTask(false)}
        onAdd={addTask}
      />

      <AddTaskModal
        key={editingTask?.id ?? 'edit'}
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        initialTask={editingTask ?? undefined}
        onAdd={handleSaveEdit}
      />

      <RewardModal
        isOpen={!!rewardTask}
        onClose={() => { setRewardTask(null); setRewardData(null); }}
        task={rewardTask}
        reward={rewardData}
      />

      <UndoConfirmModal
        isOpen={!!undoTask}
        onClose={() => setUndoTask(null)}
        onConfirm={() => undoTask && confirmUndo(undoTask.id)}
        task={undoTask}
      />
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <LangProvider>
      <DashboardContent />
    </LangProvider>
  );
}
