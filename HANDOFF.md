# HANDOFF

## Current Status

Phase 1 Web Preview 前端 mock prototype 已完成初版，所有核心页面和交互均可运行。

开发服务器：`http://localhost:3000`（在 `frontend/` 目录执行 `npm run dev`）

---

## Completed

### 页面（全部可访问）
- `/` — Landing Page：Hero 区域 + 产品特性列表
- `/create-room` — 创建 Pair Room 页面（输入名字 → 跳转等待页）
- `/join` — 加入 Pair Room 页面（输入名字 + 邀请码 MOCHI7 → 跳转 Lamb Setup）
- `/invite-waiting` — 等待搭子加入，显示邀请码 MOCHI7，可复制
- `/lamb-setup` — 创建共享小羊（选名字 + 外观，搭子已确认 mock → 跳转 Dashboard）
- `/dashboard` — 主 Dashboard，三个 Tab：Today / Meadow / Buddy

### Dashboard 功能
- **Today Tab**：个人任务列表 + 共同任务列表，支持完成任务并触发奖励弹窗
- **Meadow Tab**：Home Level 进度条 + 草地场景展示 + 待放置元素
- **Buddy Tab**：双人 Bond 亲密度卡片 + 活动记录列表
- **Feed Modal**：从库存选择食物喂 Mochi，更新饱腹 / 心情值
- **Add Task Modal**：添加个人或共同任务，选难度和可见性
- **Reward Modal**：任务完成后显示奖励内容

### 组件结构
```
components/
├── ui/Button, Modal, Badge
├── landing/HeroSection, FeatureList
├── room/CreateRoomForm, JoinRoomForm, InviteWaitingPanel
├── lamb/LambPreview, LambSetupForm, FeedModal
├── tasks/TaskCard, AddTaskModal, RewardModal
├── dashboard/DashboardLayout, TodayPanel, MeadowPanel, BuddyPanel
└── buddy/ActivityLog
```

---

## Changed Files

- `frontend/app/page.tsx` — 替换为 BaaDo Landing Page
- `frontend/app/layout.tsx` — 更新 metadata 标题和描述
- 新增全部 types/, data/, hooks/, lib/, components/ 文件

---

## Commands Run

```bash
npx create-next-app@latest frontend --typescript --tailwind --eslint --app
npm run build  # ✅ 成功，无错误，7 个路由全部生成
npx tsc --noEmit  # ✅ 零 TypeScript 错误
npm run dev  # ✅ 运行于 http://localhost:3000
```

---

## Known Issues

- 所有状态为 local mock，刷新后重置（无持久化）
- `DashboardLayout` 中共同任务完成逻辑：只有当 `completedByIds.length === 1`（即搭子已完成一半）时才触发奖励弹窗，实际场景需要后端同步
- Bond / baaCoins 数值在完成任务后 UI 没有实时更新（state 在 hooks 中，但 header 里显示的是初始 mock 值）
- 暂未实现归档 / 暂停 / 结束 Room 流程
- 暂未实现小羊每日状态衰减

---

## Next Steps

1. **修复 baaCoins / Bond 实时更新**：`useMockRoom` 中的 user 状态需要随任务完成更新
2. **Activity Log 接入真实状态**：任务完成后追加日志条目
3. **Lamb 每日衰减逻辑**：在 Dashboard 首次加载时触发 fullness -10
4. **共同任务搭子模拟**：添加"模拟搭子完成"按钮，让 partially_completed → completed 可演示
5. **后端阶段**：接入 PostgreSQL + Prisma + Express，实现真实房间状态同步

---

## Important Product Rules

1. 严格双人：不做 single mode
2. Pair Room 必须且只能有两个用户
3. 个人任务默认 private，Activity Log 不泄露 private 任务标题
4. Bond 是每个用户和小羊的独立亲密度，不是排名
5. 共同任务只有双方都完成才发放完整奖励

---

## Do Not Touch Without Confirmation

- `baa_do_product_requirements.md` — 产品规格文档
- `CLAUDE.md` — 开发协作规范
- `frontend/types/` — 类型定义（改动需同步 mock data）
- `frontend/data/mockData.ts` — mock 数据中心
- `frontend/lib/rewardRules.ts` — 奖励数值（与产品文档对应）
