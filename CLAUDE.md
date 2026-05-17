# CLAUDE.md — BaaDo / 咩Do Web Preview 开发协作指南

## 0. 先读这个

在写任何代码之前，请先阅读项目根目录中的：

```txt
BaaDo / 咩Do Web Preview 产品与技术方案.md
```

如果文件名在当前项目中被改成英文或下划线格式，例如：

```txt
baado_web_preview_product_tech_plan.md
```

请优先阅读该文件。

阅读后，请先输出一个简短开发计划，再开始写代码。不要跳过产品理解阶段。

---

## 1. 项目定位

BaaDo / 咩Do Web Preview 是一个严格双人 Todo / Habit Web 产品。

核心体验是：

> 两个人通过 Pair Room 一起完成 Todo，照顾一只共享小羊，并共同建设属于两个人的 Meadow。

请始终遵守以下产品原则：

1. 不做 single mode。
2. Pair Room 必须且只能有两个用户。
3. 个人任务用于照顾小羊。
4. 共同任务用于建设 Meadow。
5. 小羊是两个人共享的 Pair Lamb。
6. Bond 是每个用户和小羊的独立亲密度，不是排名。
7. 个人任务默认 private。
8. 共同任务双方可见。
9. Web Preview 先验证核心闭环，不提前堆复杂功能。

---

## 2. 当前开发目标

默认优先做 Web Preview 的 Phase 1：前端 mock prototype。

第一阶段先实现页面和核心交互，不接真实后端。

优先级如下：

1. Landing Page
2. Create Pair Room page
3. Join Pair Room page
4. Invite Waiting page
5. Lamb Setup page
6. Main Dashboard
7. Today Tasks section
8. Meadow / Mochi section
9. Buddy / Activity Log section
10. Add Task modal
11. Reward modal
12. Feed modal

除非用户明确要求，否则不要一开始就实现完整后端、数据库、登录系统、支付、日历、AI、社交或复杂动画。

---

## 3. 技术方向

推荐技术栈：

```txt
Frontend:
Next.js + TypeScript + Tailwind CSS

Backend:
Node.js + Express 或 NestJS

Database:
PostgreSQL

ORM:
Prisma

Deployment:
Docker Compose + Nginx

Current phase:
先做前端 mock prototype
```

如果当前代码仓库还没有初始化，请先创建清晰、最小可运行的项目结构。不要一次性生成过度复杂的工程。

---

## 4. 代码修改原则

### 4.1 不要乱删东西

严禁未经用户明确要求就删除、重命名或大规模重构已有文件。

不要做以下行为：

1. 不要删除已有页面。
2. 不要删除已有组件。
3. 不要删除已有 mock data。
4. 不要删除 README、产品文档、CLAUDE.md、handoff 文档。
5. 不要为了“整理项目”进行大范围移动文件。
6. 不要重写整个项目来替代已有实现。
7. 不要删除用户手写的注释、文案或配置，除非它们明显导致错误。

如果确实需要删除或重命名文件，必须先说明原因，并等待用户确认。

### 4.2 小步提交式修改

每次只做一个明确范围的任务，例如：

```txt
实现 Landing Page
实现 Lamb Setup 页面
拆分 Dashboard 组件
补充 mock data
修复 TaskCard 类型错误
```

不要一次性混合做 UI、路由、数据结构、后端、部署和重构。

### 4.3 保持现有功能可运行

每次修改后都要尽量保持项目可运行。

优先执行：

```bash
npm run lint
npm run typecheck
npm run build
```

如果项目还没有这些命令，请不要强行添加复杂配置。可以先用现有命令检查。

---

## 5. 文件顶部说明要求

每个新建或修改的主要代码文件，顶部都必须有简短说明。

说明必须包含中文和英文。

### 5.1 TypeScript / TSX 文件模板

```ts
/**
 * 中文：这个文件用于实现 BaaDo Web Preview 的某某功能。
 * English: This file implements the xxx feature for BaaDo Web Preview.
 */
```

### 5.2 React Component 文件模板

```tsx
/**
 * 中文：这个组件用于展示 Today 页面中的个人任务和共同任务列表。
 * English: This component displays personal and shared task lists on the Today page.
 */
```

### 5.3 Hook 文件模板

```ts
/**
 * 中文：这个 Hook 用于管理 Web Preview 阶段的 mock room 状态。
 * English: This hook manages mock room state for the Web Preview phase.
 */
```

### 5.4 Mock Data 文件模板

```ts
/**
 * 中文：这个文件存放 BaaDo Web Preview 第一阶段使用的 mock 数据。
 * English: This file stores mock data for Phase 1 of BaaDo Web Preview.
 */
```

### 5.5 配置文件

配置文件也需要说明，但可以更短：

```ts
/**
 * 中文：Tailwind 配置文件。
 * English: Tailwind configuration file.
 */
```

如果某些自动生成文件不适合添加注释，可以跳过，但不要给业务代码省略文件说明。

---

## 6. 模块化与文件长度要求

代码必须模块化，不要把一个页面写成几百行大文件。

### 6.1 文件长度限制

目标：

```txt
单个文件尽量控制在 300 行以内。
```

硬性上限：

```txt
单个文件不要超过 400 行。
```

如果一个文件接近 300 行，请主动拆分。

如果一个文件超过 400 行，必须先拆分，再继续添加功能。

### 6.2 页面拆分原则

不要把所有逻辑写在 page.tsx 里。

页面文件只负责组合结构，例如：

```txt
app/dashboard/page.tsx
```

可以拆成：

```txt
components/dashboard/DashboardLayout.tsx
components/dashboard/TodayPanel.tsx
components/dashboard/MeadowPanel.tsx
components/dashboard/BuddyPanel.tsx
components/tasks/TaskCard.tsx
components/tasks/AddTaskModal.tsx
components/lamb/LambPreview.tsx
components/lamb/FeedModal.tsx
components/activity/ActivityLog.tsx
```

### 6.3 推荐目录结构

前端可以使用：

```txt
frontend/
├── app/
│   ├── page.tsx
│   ├── create-room/
│   ├── join/
│   ├── lamb-setup/
│   └── dashboard/
│
├── components/
│   ├── layout/
│   ├── landing/
│   ├── room/
│   ├── lamb/
│   ├── tasks/
│   ├── meadow/
│   ├── buddy/
│   └── ui/
│
├── data/
│   └── mockData.ts
│
├── hooks/
│   ├── useMockRoom.ts
│   ├── useMockTasks.ts
│   └── useMockLamb.ts
│
├── types/
│   ├── user.ts
│   ├── room.ts
│   ├── task.ts
│   ├── lamb.ts
│   └── economy.ts
│
└── lib/
    └── rewardRules.ts
```

后端阶段再加入：

```txt
backend/
├── src/
│   ├── auth/
│   ├── users/
│   ├── rooms/
│   ├── invitations/
│   ├── lambs/
│   ├── tasks/
│   ├── rewards/
│   ├── inventory/
│   ├── bonds/
│   ├── meadow/
│   ├── activity-log/
│   └── audit-log/
```

---

## 7. UI 与产品风格

BaaDo / 咩Do 的视觉方向：

```txt
可爱
干净
轻量
温柔
2D 小羊
柔和草地色系
不要重度游戏界面
```

UI 应该让用户一眼理解：

1. 我今天要做什么。
2. 小羊现在怎么样。
3. 我和搭子的共同进度是什么。
4. 完成任务后我得到了什么奖励。
5. Meadow 有没有变得更丰富。

不要把 UI 做成复杂 RPG、战斗系统、排行榜或重度养成游戏。

---

## 8. 核心产品规则

### 8.1 Pair Room

```ts
type RoomStatus =
  | 'pending_pair'
  | 'lamb_setup'
  | 'active'
  | 'paused'
  | 'ending'
  | 'archived';
```

Web Preview 第一版主要实现：

```txt
pending_pair → lamb_setup → active
```

Archive 可以先做最简弹窗或预留入口。

### 8.2 Task

任务分为：

```txt
personal
shared
```

个人任务：

```txt
pending → completed / expired
```

共同任务：

```txt
pending → partially_completed → completed / expired
```

### 8.3 Reward

个人任务奖励：

```txt
生活资源
Baa Coins
Lamb EXP
Bond
```

共同任务奖励：

```txt
Home EXP
Meadow 背景元素
共同 Activity Log
```

### 8.4 Privacy

个人任务默认：

```txt
private
```

个人任务可见性：

```txt
private
status_only
visible_to_buddy
```

Activity Log 不应泄露 private 任务标题。

---

## 9. 前端 Mock 阶段实现要求

Phase 1 可以使用 mock data，但 mock data 要接近真实业务结构。

不要用随意的变量名，例如：

```txt
data1
aaa
test
thing
```

应该使用清晰命名，例如：

```txt
mockUsers
mockRoom
mockLamb
mockTasks
mockInventory
mockActivityLogs
```

推荐 mock 用户：

```txt
User A: Beiqi
User B: Alice
Lamb: Mochi
```

推荐模拟流程：

```txt
Create Room
Join Room
Create Lamb
Add Personal Task
Add Shared Task
Complete Personal Task
Feed Mochi
Mark Shared Task Done
Unlock Meadow Element
```

---

## 10. 状态管理要求

前端 mock 阶段可以使用 React state / context。

不要一开始引入过重状态库。

可以使用：

```txt
useState
useReducer
React Context
custom hooks
```

状态逻辑较复杂时，优先拆成 hook：

```txt
useMockRoom
useMockTasks
useMockLamb
useMockInventory
useMockActivityLog
```

不要把所有状态写在单个 page.tsx 里。

---

## 11. 后端阶段安全原则

进入后端阶段后，必须遵守：

1. 不相信前端传入的 userId。
2. 不相信前端传入的奖励数值。
3. 不相信前端传入的 Room 状态。
4. 所有权限由后端校验。
5. 所有奖励由后端计算。
6. 关键写操作需要幂等。
7. 任务完成、奖励发放、库存扣减要用事务。
8. 邀请 token 只存 hash。
9. Join Invite 接口必须限流。
10. Private 任务不能泄露给搭子。

后端阶段不要偷懒把前端 mock 逻辑直接当真实权限逻辑。

---

## 12. 命名规范

### 12.1 文件命名

React component：

```txt
PascalCase.tsx
TaskCard.tsx
LambPreview.tsx
RewardModal.tsx
```

Hook：

```txt
useSomething.ts
useMockTasks.ts
useMockLamb.ts
```

Types：

```txt
user.ts
room.ts
task.ts
lamb.ts
economy.ts
```

Mock data：

```txt
mockUsers.ts
mockRoom.ts
mockTasks.ts
mockItems.ts
```

### 12.2 变量命名

使用清晰业务名：

```ts
currentRoom
pairLamb
personalTasks
sharedTasks
homeExp
baaCoins
bondLevel
```

不要使用不清楚的缩写：

```ts
x
tmp
foo
bar
data1
```

---

## 13. 文案要求

产品文案要可爱，但不要羞辱用户。

可以：

```txt
Mochi is waiting in the Meadow.
Mochi saw your effort.
One small task is enough to start.
```

避免：

```txt
你太懒了。
你拖累了对方。
Mochi 被你抛弃了。
你让搭子失望了。
```

毒舌 / roast 风格只能轻微吐槽拖延行为，不能攻击人格、身体、关系或心理健康。

---

## 14. 低用量 / 低上下文时必须停止并交接

当你发现 Claude 的可用量、上下文、消息次数或工具额度只剩约 5 时，必须停止继续写代码。

不要在低用量时开始新功能、重构或大改。

### 14.1 停止前必须做的事

请创建或更新：

```txt
HANDOFF.md
```

如果已经存在 HANDOFF.md，请追加最新状态，不要覆盖有用历史。

### 14.2 HANDOFF.md 必须包含

```md
# HANDOFF

## Current Status
当前已经做到哪一步。

## Completed
- 已完成的功能
- 已创建或修改的页面
- 已创建或修改的组件

## Changed Files
- 文件路径：改了什么

## Commands Run
- 运行过的命令
- 成功或失败结果

## Known Issues
- 当前还存在什么问题
- 是否有 lint/type/build error
- 哪些地方只是 mock

## Next Steps
下一位接手者应该从哪里继续。

## Important Product Rules
需要继续遵守的产品规则。

## Do Not Touch Without Confirmation
哪些文件或逻辑不要随便改。
```

### 14.3 交接语气

交接要具体，方便 Codex 直接接手。

不要只写：

```txt
做了一些 UI，还没完成。
```

要写清楚：

```txt
已完成 Landing Page、Create Room、Join Room 的静态 UI。
Dashboard 已拆成 TodayPanel、MeadowPanel、BuddyPanel，但 AddTaskModal 还没有接入状态。
下一步应先实现 useMockTasks，再把 TaskCard 的 Complete 按钮接到 reward modal。
```

---

## 15. Codex 接手兼容要求

为了方便 Codex 接手：

1. 保持文件结构清晰。
2. 保持类型定义独立。
3. 保持 mock data 集中。
4. 保持组件小而清楚。
5. 不要把业务逻辑藏在复杂闭包里。
6. 不要生成难以阅读的超长文件。
7. 在 HANDOFF.md 中写清楚下一步。
8. 不要依赖 Claude 专属上下文，所有重要信息都写进项目文件。

---

## 16. 每次开始任务前的检查清单

开始写代码前，先检查：

```txt
[ ] 是否已阅读 Web Preview 产品与技术方案？
[ ] 当前任务属于 Phase 1、Phase 2 还是 Phase 3？
[ ] 是否需要修改已有文件？
[ ] 是否会影响已有功能？
[ ] 是否需要拆分组件？
[ ] 是否会让某个文件超过 300 行？
[ ] 是否需要更新 HANDOFF.md？
```

---

## 17. 每次完成任务后的检查清单

完成任务后，检查：

```txt
[ ] 页面是否能运行？
[ ] 文件顶部是否有中英文说明？
[ ] 是否没有乱删东西？
[ ] 是否没有超长文件？
[ ] 类型是否清晰？
[ ] mock data 是否集中？
[ ] 是否保持 BaaDo 严格双人定位？
[ ] 是否没有引入 single mode？
[ ] 是否没有泄露 private task？
[ ] 是否记录了已完成内容？
```

---

## 18. 最重要的工作方式

请始终采用：

```txt
先读文档
再做计划
小步实现
保持模块化
不乱删东西
低用量及时停
写清楚交接
```

BaaDo / 咩Do Web Preview 当前最重要的目标不是技术炫技，而是验证核心闭环是否成立：

> 两个人是否愿意因为一只共同小羊，而一起完成 Todo。
