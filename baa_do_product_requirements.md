# BaaDo / 咩Do 产品需求与结构草案

## 1. 产品定位

**BaaDo / 咩Do 是一个严格双人模式的 Todo / Habit App。两个用户必须一起创建或加入同一个 Pair Room，通过完成个人任务照顾小羊，通过完成共同任务建设两个人的 Meadow 草地小窝。**

更短的产品表达：

> 两个人一起完成 Todo，养大一只只属于你们的小羊。

英文表达：

> A two-person todo app where you and your buddy complete real-life tasks to raise a shared virtual lamb together.

核心差异化：

- **严格双人**：不做单人模式，不做多人群组。
- **共同进退**：两个人一起开始、一起养；如果不继续，就暂停或归档。
- **小羊情感反馈**：小羊不是装饰，而是任务反馈和关系记忆的载体。
- **双线奖励**：个人任务照顾小羊，共同任务建设 Meadow。

---

## 2. 核心产品价值

BaaDo / 咩Do 的重点不是单纯记录任务，而是把 Todo 变成一种双人共同照顾行为。

用户不是一个人在打勾，而是和另一个人一起完成任务、喂小羊、提升亲密度、建设共同草地小窝。

### 用户完成任务后获得

- 现实进度感：今天真的完成了一件事。
- 生活照顾感：个人任务获得羊粮、小草、零食、玩具、服装等生活资源。
- 共同建设感：共同任务获得背景元素、Home EXP、草地装饰和双人纪念物。
- 情感反馈感：小羊变得更亲近自己。
- 社交陪伴感：和搭子一起推进共同目标。
- 轻微压力感：小羊和搭子都在等你完成任务。
- 关系记忆感：两个人共同养大的小羊代表共同投入。

### 和普通 Todo App 的区别

普通 Todo App：

> 添加任务 → 完成任务 → 打勾 → 结束

BaaDo / 咩Do：

> 完成个人任务 → 获得羊粮 / 小草 / 生活道具 → 照顾小羊 → 提升个人亲密度  
> 完成共同任务 → 获得背景元素 / Home EXP → 建设 Meadow → 强化双人共同关系

---

## 3. 目标用户

### 3.1 主要用户

1. **朋友 / 学习搭子**
   - 一起学习、健身、准备考试、找工作、做项目。
   - 需要轻量互相监督，但不想太严肃。

2. **情侣**
   - 一起完成生活习惯、家务、健身、早睡、存钱等目标。
   - 喜欢一起养电子小羊、收集装扮、建设小家。

3. **室友 / 合租伙伴**
   - 一起维护共同生活任务，例如打扫、倒垃圾、采购。
   - 需要让任务分配更可视化、更有趣。

4. **双人 accountability partner**
   - 两个人约定互相督促。
   - 需要比普通 Todo 更有情绪反馈和关系绑定。

---

## 4. 产品版本范围

## 4.1 Prototype：第一版可演示原型

第一版原型只验证核心闭环，不追求完整产品能力。

必须演示：

1. 创建 Pair Room。
2. 第二个用户加入。
3. 进入 `lamb_setup`。
4. 两人创建一只叫 Mochi 的小羊。
5. 创建一个个人任务和一个共同任务。
6. 完成个人任务，获得羊粮 / 小草 / Baa Coins。
7. 用个人任务奖励喂 Mochi。
8. 当前用户和 Mochi 的 Bond 上升。
9. 共同任务由双方分别确认完成。
10. 完成共同任务后，Home EXP 上升，并解锁一个背景元素。
11. 将背景元素放入 Meadow。
12. 小羊触发庆祝动作或新台词。

Prototype 可以先用 mock data + local state，不需要真实后端。

---

## 4.2 MVP：第一版产品

MVP 需要包含：

1. 创建 Pair Room。
2. 通过邀请码 / 邀请链接邀请第二个用户。
3. 第二个用户加入后，Pair Room 进入 `lamb_setup`。
4. 两个用户共同创建一只 Pair Lamb。
5. Pair Room 进入 `active` 后，进入主功能区。
6. 创建个人 Todo 任务。
7. 创建共同 Todo 任务。
8. 个人任务奖励生活资源 / Baa Coins。
9. 共同任务奖励背景元素 / Home EXP。
10. 喂小羊增加亲密度。
11. 每个用户和小羊有独立 Bond 等级。
12. 两人共同提升 Home Level。
13. 解锁基础动作、台词、服装或背景元素。
14. 基础活动记录。
15. 基础隐私设置：个人任务可见性。
16. 最简退出 / 归档机制。

MVP 暂时不做：

1. 单人养羊模式。
2. 完整第三方日历同步。
3. 复杂 AI 自动排程。
4. 多人群组模式。
5. 真实支付系统。
6. 复杂 3D 小羊模型。
7. 小羊繁殖、交易、排名等重游戏系统。
8. 高复杂度社交广场。
9. 开局多只小羊。

MVP 核心验证问题：

> 用户是否愿意因为双人协作、小羊反馈和共同建设感，持续完成 Todo？

---

## 4.3 V1：体验增强版

V1 可以加入：

- 轻量 Buddy Schedule：手动添加 free / busy 时间块。
- 小羊屏幕推送。
- 更完整的暂停 / 恢复 / 冷静期 / 归档流程。
- Memory Album / 纪念册。
- 商店和衣柜。
- 连续打卡。
- 季节活动入口。
- 更丰富的小羊动作和台词。

---

## 4.4 V2 / Future：长期扩展

后续可以加入：

- Google Calendar / Apple Calendar / Outlook Calendar 同步。
- AI 自动安排任务。
- 第二只小羊与 Sheep Pen 羊圈。
- 小羊活动系统：上学、运动、玩耍。
- 小羊社交系统：和其他 Pair Room 的小羊成为朋友。
- 小羊语音。
- 桌面 / 小组件。
- 完整 LiveOps 活动系统。
- 多个 Pair Room 切换。

---

## 5. 核心概念设计

## 5.1 Pair Room 双人房间

BaaDo / 咩Do 不做 Single Mode。产品核心是严格双人 Pair Mode。

Pair Room 规则：

- **必须且只能有两个用户**。
- MVP 阶段一个 Pair Room 只能有一只共享小羊。
- 一个用户在 MVP 中只能拥有一个 active Pair Room。
- 创建房间后，如果第二个人还没加入，房间状态为 `pending_pair`。
- 第二个人加入后，Pair Room 进入 `lamb_setup`。
- 双方确认小羊后，Pair Room 才变为 `active`。
- MVP 不支持第三个人加入。
- MVP 不支持多人群组。

Pair Room 绑定：

- 两个用户。
- 一只共享小羊。
- 两个人的个人 Todo List。
- 共同 Todo List。
- 每个用户与小羊的独立 Bond。
- 共同 Home Level。
- 双人活动记录。
- 后续可加入双人日程视图。

### 为什么不做 Single Mode？

BaaDo / 咩Do 的差异化不是“一个人养小羊”，而是“两个人一起对一只小羊负责”。

不做 Single Mode 的好处：

1. **产品定位更清晰**：从第一天就是双人产品，不会变成普通 habit pet app。
2. **关系绑定更强**：用户必须邀请一个人一起开始，天然形成社交留存。
3. **小羊意义更明确**：小羊不是个人资产，而是两个人共同关系的载体。
4. **系统复杂度更低**：不需要处理 Single Lamb、Single Room、Single → Pair 升级和个人小羊资产迁移。

---

## 5.2 Pair Room 状态

Pair Room 的状态需要覆盖从邀请、创建小羊、正式使用、暂停到结束的完整生命周期。

| 状态 | 含义 | 可访问页面 |
|---|---|---|
| `pending_pair` | 房间已创建，只有创建者在等待 | Invite / Pending Pair 页面 |
| `lamb_setup` | 第二个用户已加入，双方正在创建 / 确认小羊 | Lamb Setup 页面 |
| `active` | Pair Lamb 已创建，可以正式使用 | 主 Tab 页面 |
| `paused` | Pair Room 暂停，小羊 resting | Pause 页面 |
| `ending` | 一方发起退出，冷静期内 | Ending 页面 |
| `archived` | 房间归档，不再进入日常循环 | Memory Album 页面 |

状态流转：

```txt
pending_pair
   ↓ 第二个用户接受邀请
lamb_setup
   ↓ 两人创建 / 确认 Pair Lamb
active
   ↓ 暂停
paused
   ↓ 双方恢复
active
   ↓ 一方发起退出
ending
   ↓ 冷静期结束或双方确认结束
archived
```

---

## 5.3 Pair Lamb 共享小羊

小羊是 BaaDo / 咩Do 的核心情感对象。

BaaDo / 咩Do 中的小羊不是个人小羊，而是 **Pair Lamb**：

> 两个人共同领养、共同照顾、共同解锁内容的一只小羊。

小羊属性包括：

- 小羊名字。
- 小羊外观：白色羊羔、奶茶色羊羔、卷毛羊羔等。
- 小羊等级。
- 饱腹值。
- 心情值。
- 当前服装。
- 当前动作状态。
- 当前 Meadow 背景。
- 已解锁语言包。
- 已解锁动作。
- 已解锁服饰。
- 已解锁节日限定奖励。

小羊不是单纯装饰，而是任务反馈、双人关系和长期留存的主要载体。

---

## 5.4 三条成长线

为避免概念混乱，BaaDo / 咩Do 使用三条成长线。

### 1. 小羊状态线

主要由个人任务和喂养影响。

包括：

- fullness 饱腹值。
- mood 心情值。
- lamb level 小羊等级。
- 小羊动作。
- 小羊语言。
- 小羊日常装扮。

### 2. 个人关系线

每个用户各自独立。

包括：

- Bond level。
- 专属称呼。
- 专属台词。
- 专属互动动作。

### 3. 共同建设线

主要由共同任务影响。

包括：

- Home Level。
- Meadow 背景。
- 背景元素。
- Sheep Pen 羊圈。
- 双人场景。
- 纪念物。

---

## 5.5 Task / Todo 任务

任务分为两类：个人任务和共同任务。

### 个人任务

个人任务属于某一个用户，主要用于照顾小羊的日常生活。

完成个人任务后，用户可以获得：

- 羊粮 / 小草。
- 小零食。
- 玩具。
- 服装碎片 / 小配饰。
- 个人 Baa Coins。
- Lamb EXP。
- 当前用户与小羊的 Bond 增长。

例子：

- 背 30 个单词。
- 运动 20 分钟。
- 投 3 份简历。
- 完成一页作品集。

个人任务可见性：

- 对搭子可见。
- 只显示完成状态。
- 完全私密，只给自己和小羊反馈。

个人任务状态：

```txt
pending → completed / expired
```

### 共同任务

共同任务需要两个人共同完成，主要用于建设共同 Meadow。

完成共同任务后，双方可以获得：

- Home EXP。
- 草地背景元素。
- 家园装饰。
- 季节活动背景材料。
- 羊圈升级材料。
- 双人纪念元素。

例子：

- 一起散步 20 分钟。
- 一起整理房间。
- 一起复盘本周计划。
- 一起完成一次学习打卡。

共同任务状态：

```txt
pending → partially_completed → completed / expired
```

共同任务规则：

- 用户 A 点击完成后，任务进入 `partially_completed`。
- 用户 B 也点击完成后，任务进入 `completed`。
- 只有 `completed` 后才发放完整共同任务奖励。
- `partially_completed` 时可以给小羊触发轻量等待反馈，但不发放完整奖励。

---

## 5.6 奖励系统：生活资源 vs 背景元素

BaaDo / 咩Do 的奖励系统区分两条奖励方向：

1. **个人任务 → 小羊生活资源**
   - 用于照顾小羊本身。
   - 强化“我今天做了事，所以我可以照顾小羊”的反馈。

2. **共同任务 → Meadow 背景元素**
   - 用于建设两个人共同的草地小窝。
   - 强化“我们一起完成了事，所以我们的世界变得更丰富”的反馈。

### MVP 数值设计原则

MVP 数值先保持简单，避免一开始做复杂经济系统。

原则：

- 只保留 Easy / Medium / Hard 三档任务难度。
- 个人任务只产出生活资源、Baa Coins、少量 Lamb EXP 和 Bond。
- 共同任务只产出 Home EXP 和背景元素，不作为主要金币来源。
- 不做随机掉落，不做复杂概率。
- 不做道具合成，不做复杂背包系统。
- 所有数值先容易理解，后续再通过版本升级调整。

### Baa Coins 定位

Baa Coins 是个人余额，主要通过个人任务获得，用于购买小羊生活用品。

共同任务不以 Baa Coins 为主要奖励，而是以 Home EXP 和背景元素为主。这样可以避免共同任务被简化成“刷钱”，同时更符合共同建设主题。

### MVP 个人任务奖励表

| 难度 | 适合任务 | 奖励 | 小羊成长 | Bond 增长 |
|---|---|---|---:|---:|
| Easy | 5–15 分钟小任务 | Basic Hay x1 + 5 Baa Coins | +5 Lamb EXP | +5 Bond |
| Medium | 15–45 分钟常规任务 | Premium Clover x1 + 12 Baa Coins | +10 Lamb EXP | +10 Bond |
| Hard | 45 分钟以上 / 高难度任务 | Berry Treat x1 + 25 Baa Coins | +20 Lamb EXP | +15 Bond |

### MVP 共同任务奖励表

| 难度 | 适合任务 | Home EXP | 背景元素奖励 |
|---|---|---:|---|
| Easy | 轻量共同任务 | +10 Home EXP | Small Flower / Pebble |
| Medium | 常规共同任务 | +25 Home EXP | Flower Path / Wooden Sign |
| Hard | 高投入共同任务 | +50 Home EXP | Picnic Blanket / Shared Bench |

共同任务只有在双方都完成后才发放完整奖励。

如果只有一方完成：

- 任务进入 `partially_completed`。
- 不发放 Home EXP。
- 不解锁背景元素。
- 可以给已完成的一方一个轻量反馈，例如小羊说：“Mochi 看到了你的努力，等另一个人一起完成就能装饰 Meadow 了。”

### 生活物品效果表

| 物品 | 来源 | 效果 |
|---|---|---|
| Basic Hay | Easy 个人任务 / 商店 | Fullness +15 |
| Premium Clover | Medium 个人任务 / 商店 | Fullness +30, Mood +5 |
| Berry Treat | Hard 个人任务 / 商店 | Mood +20, Bond +5 |
| Small Ball | 商店 | Mood +10 |
| Little Scarf | 商店 / 后续活动 | 装扮，无数值加成 |

### 商店价格表

| 商品 | 价格 |
|---|---:|
| Basic Hay | 10 Baa Coins |
| Premium Clover | 25 Baa Coins |
| Berry Treat | 20 Baa Coins |
| Small Ball | 40 Baa Coins |
| Little Scarf | 60 Baa Coins |
| Sleepy Hat | 80 Baa Coins |
| Study Glasses | 80 Baa Coins |

MVP 中服装暂时不提供数值加成，只作为收集和装扮奖励，避免 pay-to-progress 感。

### 小羊状态规则

MVP 中小羊状态只保留两个核心值：

1. **Fullness 饱腹值**
   - 范围：0–100
   - 初始值：70
   - 喂食可增加 fullness
   - MVP 暂时不做复杂每日衰减，可以只在每天首次打开 App 时 -10

2. **Mood 心情值**
   - 范围：0–100
   - 初始值：70
   - 喂 Berry Treat、Play、完成任务可增加 mood
   - MVP 暂时不做复杂情绪系统，可以只在长时间没有完成任务时下降

简单状态映射：

| 条件 | 小羊状态 |
|---|---|
| Fullness ≥ 70 且 Mood ≥ 70 | Happy |
| Fullness < 40 | Hungry |
| Mood < 40 | Sad |
| Fullness ≥ 50 且 Mood ≥ 50 | Normal |

### Lamb Level 规则

Lamb Level 使用 Lamb EXP 升级，主要由个人任务获得。

| Lamb Level | 所需累计 Lamb EXP | 解锁内容 |
|---|---:|---|
| Lv. 1 | 0 | 初始小羊 |
| Lv. 2 | 50 | 开心蹦跳动作 |
| Lv. 3 | 120 | 新台词包：撒娇 |
| Lv. 4 | 220 | 贴贴动作 |
| Lv. 5 | 350 | 小羊午睡动作 |

MVP 先做到 Lv. 5 即可，后续版本再扩展。

### Bond 规则

Bond 是每个用户和小羊的独立亲密度。

| Bond Level | 所需累计 Bond Points | 解锁内容 |
|---|---:|---|
| Lv. 1 | 0 | 小羊认识你 |
| Lv. 2 | 40 | 欢迎回来台词 |
| Lv. 3 | 100 | 专属撒娇台词 |
| Lv. 4 | 180 | 贴贴动作 |
| Lv. 5 | 300 | 专属称呼 |

MVP 先做到 Bond Lv. 5 即可。

### Home Level 规则

Home Level 代表两个人共同建设 Meadow 的进度，主要由共同任务获得。

| Home Level | 所需累计 Home EXP | 解锁内容 |
|---|---:|---|
| Lv. 1 | 0 | 基础草地小窝 |
| Lv. 2 | 30 | 小草篮 / 小毯子 |
| Lv. 3 | 80 | 温暖草地背景 |
| Lv. 4 | 150 | 小花园 / 小木牌 |
| Lv. 5 | 250 | 双人散步场景 |

MVP 先做到 Home Lv. 5 即可。Sheep Pen 和第二只小羊放到 Future。

### 奖励归属规则

- 完成个人任务：完成者获得生活类资源 / Baa Coins；小羊获得 Lamb EXP；完成者与小羊的 Bond 增加。
- 完成共同任务：双方共同获得 Home EXP / 背景元素；Meadow 成长；触发双人庆祝反馈。
- 喂小羊：消耗当前用户的 Baa Coins、羊粮或小草；增加当前用户与小羊的 Bond。
- 购买生活用品：默认属于购买者库存，主要用于喂养、互动、换装。
- 解锁背景元素：默认进入 Room Inventory，属于共同 Meadow。

### 后续升级方向

后续版本可以再加入：

- 连续打卡 bonus。
- 活动限定货币。
- 稀有装扮。
- 背景元素组合。
- 第二只小羊和 Sheep Pen 的长期消耗。
- 更细的 mood 系统。

这些都不进入 MVP，避免第一版数值过重。

---

## 5.7 Bond 亲密度系统

在同一个 Pair Room 中，两个用户分别和小羊建立独立 Bond。

例如：

- User A 与 Mochi 的 Bond：Lv. 4。
- User B 与 Mochi 的 Bond：Lv. 2。

Bond 增长方式：

- 完成个人任务。
- 喂小羊。
- 摸摸 / 互动。
- 连续打卡。
- 完成共同任务。
- 在活动期间完成限定任务。

Bond 解锁内容：

| Bond 等级 | 解锁内容 |
|---|---|
| Lv. 1 | 小羊认识你，会叫你的名字 |
| Lv. 2 | 小羊会主动欢迎你回来 |
| Lv. 3 | 解锁专属撒娇台词 |
| Lv. 4 | 解锁贴贴动作 |
| Lv. 5 | 解锁专属称呼 |
| Lv. 6 | 解锁高级动作，例如蹦过来、转圈 |
| Lv. 7 | 解锁专属服装偏好 |

注意：Bond 不能设计成纯比较，否则可能制造关系压力。

---

## 5.8 Home Level / Meadow 等级

Home Level 代表两个人共同建设 Meadow 的成果。

Home Level 主要通过共同任务提升。个人任务负责照顾小羊生活状态，共同任务负责建设两个人共享的 Meadow 世界。

| Home Level | 解锁内容 |
|---|---|
| Lv. 1 | 基础草地小窝 |
| Lv. 2 | 小毯子 / 小草篮 |
| Lv. 3 | 温暖草地背景 |
| Lv. 4 | 小花园 / 小木牌 |
| Lv. 5 | 双人散步场景 |
| Lv. 6 | 小羊生日派对 |
| Lv. 7 | Sheep Pen 羊圈预告 |
| Lv. 8 | 第二只小羊领养资格 |

---

## 5.9 Lamb Push / 小羊督促推送

BaaDo / 咩Do 的屏幕推送不是普通系统提醒，而是小羊主动来督促用户。

用户收到的不是“你有一个任务未完成”，而是类似：

> “Mochi 正在用小蹄子敲你的屏幕：今天的任务还没完成哦。”

小羊督促语气：

1. **温柔型**
   - “Mochi 用小蹄子轻轻敲了敲屏幕：今天还有一个小任务没有完成哦。”

2. **傲娇型**
   - “Mochi 把小蹄子搭在屏幕边：我才不是在等你，只是刚好看到你的任务还没完成。”

3. **损友型 / 毒舌型**
   - “Mochi 用小蹄子敲屏幕：你已经拖了三个小时了，小羊都开始怀疑你是不是进入省电模式了。”

4. **教练型**
   - “Mochi 站到屏幕正中间：现在完成一个 5 分钟任务。不要讨论，不要犹豫，开始。”

5. **低打扰型**
   - 只在关键时间提醒，不频繁发送消息。

推送触发场景：

- 任务快到期。
- 今天还没有完成任何任务。
- 搭子已经完成，自己还没完成。
- 小羊饥饿值较低。
- 小羊心情值下降。
- 连续打卡即将中断。
- 共同任务还未完成。
- 用户长时间没有打开 App。
- 双方日程出现共同空档，但共同任务还没安排。

推送原则：

- 文案以小羊第一视角出现。
- 允许用户调节语气强度。
- 允许用户设置低打扰模式和免打扰时间。
- 避免人格羞辱、身体羞辱、关系攻击、心理健康攻击。
- 重点提醒拖延行为，而不是攻击用户本人。
- 失败后提供补救任务，而不是只批评。

---

## 5.10 Buddy Schedule / 双人日程

日程合并是有价值的，但不应抢占 MVP 主线。

建议版本规划：

- Prototype：不做日程。
- MVP：只支持任务日期 / 简单时间。
- V1：做轻量 Buddy Schedule，支持手动添加 free / busy 时间块。
- V2：接入 Google Calendar / Apple Calendar / Outlook Calendar。

### V1 轻量日程能力

- 日视图 / 周视图。
- 显示个人 Todo。
- 显示共同 Todo。
- 显示双方手动添加的 busy / free 时间。
- 自动高亮双方共同空闲时间。
- 支持在共同空闲时间创建共同任务。

### 隐私规则

第三方日历同步时，默认只共享 free / busy 状态，不直接暴露事件标题和详情。

共享级别：

1. 只共享是否有空。
2. 共享事件标题。
3. 共享完整详情。
4. 只让 AI 计算，不给对方看详情。

---

## 5.11 Pair Break / 暂停与结束机制

BaaDo / 咩Do 主打“共同进退”，所以 Pair Room 不能在只剩一个人的情况下继续正常运行。

但是“共同进退”不应该等于强行绑定。用户需要有体面退出、暂停和结束关系的方式。

核心原则：

> 两个人一起养，就两个人一起推进；如果其中一个人不想继续，Pair Room 进入暂停或结束状态，而不是变成单人模式。

### 暂停

适合考试周、旅行、生病、项目高峰期等短期无法同步的情况。

暂停期间：

- 不产生连续打卡惩罚。
- 小羊饥饿值和心情值不下降。
- 共同任务暂停计算。
- 日程提醒减少或关闭。
- 小羊状态显示为 resting / on a little meadow trip。

推荐文案：

> “Mochi 知道你们最近有点忙，所以先去草地小窝里休息。等你们准备好了，可以一起回来继续。”

### 恢复

推荐流程：

1. 任意一方点击 Resume Pair Room。
2. 另一方收到恢复请求。
3. 另一方确认后，Pair Room 从 `paused` 回到 `active`。
4. 小羊显示欢迎回来动画。
5. 连续打卡从恢复当天重新计算。

### 退出 / 归档

如果一方明确不想继续，流程为：

```txt
Leave Request → Cooling-off → Archive
```

推荐流程：

1. 用户点击 Leave Pair Room。
2. 系统展示影响说明。
3. 用户确认后，Pair Room 进入 `ending`。
4. 另一方收到通知。
5. 系统提供 3–7 天冷静期。
6. 冷静期内，发起退出的一方可以取消退出。
7. 冷静期结束后，Pair Room 进入 `archived`。
8. 小羊进入 Memory Album，不再参与日常任务循环。

结束后：

- Pair Lamb 进入 Memory Album。
- 两个用户都可以查看历史记录。
- 两个用户都不能继续喂食、做任务或升级这只小羊。
- 小羊不会“死亡”，而是进入 resting / memory 状态。
- 用户之后可以和新的搭子创建新的 Pair Room 和新的 Pair Lamb。

退出机制必须避免：

- 用小羊哭泣强迫用户留下。
- 给退出用户扣分、羞辱或公开标记。
- 向另一方发送带责备意味的通知。
- 让 AI 说“你抛弃了 Mochi”。
- 把关系失败包装成个人失败。

---

## 6. Future Roadmap / 后续扩展

## 6.1 第二只小羊与 Sheep Pen 羊圈

BaaDo / 咩Do 可以在长期成长后允许同一个 Pair Room 解锁第二只小羊。

这个机制不在 MVP 初始开放，而是作为长期投入奖励：

> 两个人共同坚持足够久、完成足够多任务后，系统自动解锁 Sheep Pen / 羊圈，并允许领养第二只小羊。

解锁条件示例：

| 条件 | 示例门槛 |
|---|---|
| Pair Room 共同养成时间 | 30 天 / 60 天 |
| 总完成任务数 | 100 个任务 |
| 共同任务完成数 | 20 个共同任务 |
| Home Level | 达到 Lv. 5 |
| 双方最低 Bond | 两个人都至少 Bond Lv. 4 |

设计原则：

- 第二只小羊仍然属于两个人。
- 不要求用户每天分别喂两只小羊。
- 第一只小羊保留主角地位。
- 第二只小羊是长期留存奖励，不是初始功能。
- 羊圈可以作为季节活动和背景装饰的扩展空间。

---

## 6.2 小羊活动系统：上学 / 运动 / 玩耍

小羊可以根据用户和搭子的任务完成情况，解锁不同生活活动。

| 现实任务类型 | 小羊活动 | 可能奖励 |
|---|---|---|
| 学习 / 工作 | Lamb School 上学 | 学习眼镜、小书包、校园背景 |
| 运动 / 健康 | Lamb Workout 运动 | 运动头带、草地跑道、蹦跳动作 |
| 休息 / 娱乐 | Lamb Playtime 玩耍 | 玩具球、泡泡机、开心动作 |
| 家务 / 整理 | 打扫草地 | 小扫帚、干净小窝背景 |
| 共同任务 | 双人活动 | 野餐、散步、合照背景 |

原则：活动系统服务于 Todo 动机，不取代 Todo。

---

## 6.3 小羊社交系统

后续可以支持不同 Pair Room 的小羊之间建立朋友关系。

这不是多人共同养羊，也不是多人群组，而是：

> 每个 Pair Room 仍然只属于两个人，但你们的小羊可以认识其他 Pair Room 的小羊。

社交形式：

- 小羊好友。
- Meadow 互访。
- 小羊合照。
- 送一束小草。
- 留一个贴纸。
- 点赞对方草地。

隐私边界：

其他 Pair Room 只能看到：

- 小羊名字。
- 小羊外观。
- 已公开装扮。
- Meadow 公开背景。
- 公开成就或活动徽章。

不能看到：

- 个人任务内容。
- 共同任务内容。
- 日程信息。
- Bond 详细比较。
- 退出 / 暂停 / archived 状态的私人原因。

---

## 6.4 Seasonal Events / 季节活动系统

BaaDo / 咩Do 可以通过限时活动维护用户活跃度。

典型活动形式：

> 在限定时间内完成任务，收集活动道具，兑换限定小羊服装 / 动作 / 语言 / Meadow 装饰。

### 活动例子：Christmas Meadow Festival

活动时间：12 月 1 日 – 12 月 31 日

活动目标：

- 完成个人任务获得 Snowflakes。
- 完成共同任务获得更多 Snowflakes。
- 连续打卡 7 天解锁 Christmas Gift Box。
- 活动期间喂食小羊有概率触发圣诞限定台词。
- 累计活动积分后获得限定圣诞帽。

活动奖励：

| 条件 | 奖励 |
|---|---|
| 完成 5 个任务 | 圣诞袜装饰 |
| 完成 10 个任务 | 圣诞铃铛项圈 |
| 完成 15 个任务 | Christmas Hat 圣诞帽 |
| 完成 5 个共同任务 | 双人圣诞合照背景 |
| 连续打卡 7 天 | 圣诞限定台词包 |

---

## 7. 核心用户流程

## 7.1 新用户进入流程

1. 打开 App。
2. 看到 BaaDo / 咩Do 欢迎页。
3. 选择创建 Pair Room 或加入 Pair Room。
4. 创建者生成邀请链接 / 邀请码。
5. 第二个用户接受邀请。
6. Pair Room 进入 `lamb_setup`。
7. 两人共同选择小羊外观。
8. 两人给小羊命名。
9. 选择小羊督促语气。
10. 创建第一个 Todo。
11. 完成第一个 Todo。
12. 获得奖励并喂小羊。
13. 解锁第一次亲密互动。

---

## 7.2 创建 / 加入 Pair Room 流程

### 创建 Pair Room

1. 用户点击 Create Pair Room。
2. 系统创建 `pending_pair` 房间。
3. 系统生成邀请码 / 邀请链接。
4. 创建者分享给第二个用户。
5. 第二个用户打开邀请链接。
6. 第二个用户确认加入。
7. Pair Room 变为 `lamb_setup`。
8. 两人共同创建 Pair Lamb。
9. Pair Lamb 创建完成后，Pair Room 变为 `active`。
10. 两人进入共同房间。

### 加入 Pair Room

1. 用户点击 Join Pair Room。
2. 输入邀请码 / 打开邀请链接。
3. 查看房间邀请说明。
4. 确认加入。
5. 系统检查是否已经有 active Pair Room。
6. 如果没有 active Pair Room，加入成功。
7. 如果已经有 active Pair Room，提示用户 MVP 阶段暂不支持多个 active Pair Room。
8. 如果房间已经有两个用户，提示该邀请码已失效或房间已满。

邀请异常情况：

- 邀请码错误。
- 邀请码过期。
- 邀请已被取消。
- 房间已满。
- 被邀请用户已经有 active Pair Room。
- 创建者取消 pending_pair 房间。

---

## 7.3 创建 Pair Lamb 流程

1. Pair Room 已经进入 `lamb_setup`。
2. 两人进入小羊创建页面。
3. 一方提出小羊方案：外观、名字、督促语气。
4. 另一方确认或提出修改。
5. 双方确认后，系统创建 Pair Lamb。
6. 两人都从 Bond Lv. 1 开始。
7. Pair Room 变为 `active`。
8. 进入 Meadow 页面。

MVP 可以简化为：创建者先设置小羊，加入者点击确认。

---

## 7.4 完成个人任务流程

1. 用户进入 Today 页面。
2. 查看今日个人任务。
3. 点击完成任务。
4. 系统弹出完成反馈。
5. 用户获得羊粮 / 小草 / Baa Coins。
6. 小羊出现开心动作。
7. 用户可以选择立即喂小羊。
8. 当前用户与小羊的 Bond 增加。
9. 如果达到等级门槛，解锁新动作 / 台词 / 服装。

---

## 7.5 完成共同任务流程

1. 用户 A 创建共同任务。
2. 用户可以选择任务日期 / 时间段。
3. 用户 A 点击完成后，任务进入 `partially_completed`。
4. 系统提醒用户 B 进行确认或完成。
5. 用户 B 也点击完成后，任务进入 `completed`。
6. 双方完成后触发共同奖励。
7. Home EXP 上升。
8. 解锁背景元素。
9. 将背景元素放入 Meadow。
10. 小羊触发双人庆祝动作。

如果到期时只有一方完成，任务不发放完整共同奖励，但可以记录为 partial completion。

---

## 8. MVP 页面线框结构 / Wireframe

MVP 页面线框按 Pair Room 状态分成三段：

1. **未进入房间 / pending_pair**：创建或加入 Pair Room。
2. **lamb_setup**：两人共同创建小羊。
3. **active**：进入 4 个主 Tab：Today、Meadow、Shop、Buddy。

---

## 8.1 全局导航逻辑

### 状态驱动路由

```txt
No active room
   ↓
Welcome / Create or Join Pair Room
   ↓ 创建房间
pending_pair
   ↓ 第二个用户加入
lamb_setup
   ↓ 创建 Pair Lamb
active
   ↓
Main Tabs: Today / Meadow / Shop / Buddy
```

### 页面进入规则

| Room 状态 | 用户看到的页面 |
|---|---|
| 没有房间 | Welcome 页面 |
| `pending_pair` | Invite / Waiting 页面 |
| `lamb_setup` | Lamb Setup 页面 |
| `active` | 主 Tab 页面 |
| `archived` | Memory / Archived 提示页，MVP 可简化 |

---

## 8.2 Welcome 页面

### 页面目标

让用户理解 BaaDo / 咩Do 是严格双人产品，并选择创建或加入 Pair Room。

### 页面结构

```txt
[Logo: BaaDo / 咩Do]
[插画：两个人牵着一只小羊 / 小羊站在草地上]

标题：两个人一起完成 Todo，养大一只小羊
副标题：个人任务照顾小羊，共同任务建设你们的 Meadow。

[Primary Button] Create Pair Room
[Secondary Button] Join with Invite Code

底部小字：BaaDo 需要两个人一起开始。暂不支持单人模式。
```

### 关键组件

- Logo / 产品名
- 小羊主视觉
- 产品一句话说明
- Create Pair Room 按钮
- Join with Invite Code 按钮
- 单人模式说明

### 点击行为

- 点击 **Create Pair Room** → 创建 `pending_pair` 房间 → 进入 Invite / Waiting 页面。
- 点击 **Join with Invite Code** → 打开 Join Pair Room 页面。

---

## 8.3 Create / Invite Pair Room 页面

### 页面目标

创建者生成邀请码或邀请链接，并等待第二个用户加入。

### 页面结构

```txt
顶部：Create Pair Room

[状态卡片]
Waiting for your buddy...
咩Do 需要两个人一起开始。

[邀请码卡片]
Invite Code: BAADO-4821
[Copy Code]

[邀请链接卡片]
baado.app/invite/BAADO-4821
[Share Invite Link]

[预览卡片]
下一步：你们将一起创建一只小羊。

[Secondary Button] Cancel Room
```

### 关键组件

- 等待状态提示
- 邀请码
- 复制按钮
- 分享链接按钮
- 下一步说明
- 取消房间按钮

### 点击行为

- Copy Code → 复制邀请码。
- Share Invite Link → 调用系统分享。
- Cancel Room → 二次确认 → 回到 Welcome。
- 第二个用户加入后 → Room 状态变为 `lamb_setup` → 跳转 Lamb Setup。

### 空 / 异常状态

- 邀请链接过期：显示重新生成邀请链接。
- 房间已满：提示该房间已经有两个人。
- 创建者取消房间：加入者看到邀请已失效。

---

## 8.4 Join Pair Room 页面

### 页面目标

让第二个用户通过邀请码或邀请链接加入 Pair Room。

### 页面结构

```txt
顶部：Join Pair Room

标题：加入你的搭子的 Meadow
输入框：Enter invite code

[Primary Button] Join Pair Room

[邀请预览卡片 - 如果通过链接打开]
Beiqi invited you to raise a lamb together.
Room status: Waiting for second buddy

[提示]
加入后，你们将一起创建一只共同的小羊。
```

### 关键组件

- 邀请码输入框
- Join 按钮
- 邀请预览卡片
- 错误提示区域

### 点击行为

- 输入邀请码并点击 Join → 校验邀请码。
- 校验成功 → 加入房间 → Room 状态变为 `lamb_setup`。
- 校验失败 → 显示错误。

### 异常状态

- 邀请码错误：`这个邀请码好像不存在。再检查一下？`
- 邀请码过期：`这个邀请已经过期。请让你的搭子重新发送邀请。`
- 房间已满：`这个 Pair Room 已经有两个人了。`
- 用户已有 active Pair Room：`MVP 阶段暂时只能加入一个 active Pair Room。`

---

## 8.5 Lamb Setup 页面

### 页面目标

两个人共同创建 Pair Lamb，让小羊成为这段双人关系的起点。

### MVP 简化原则

MVP 不做实时双人协同编辑。可以先采用：

> 创建者设置小羊 → 加入者确认 → 创建成功。

### 页面结构

```txt
顶部：Create Your Lamb
进度：Step 1 of 3 / Step 2 of 3 / Step 3 of 3

[小羊预览区]
    小羊插画
    当前外观 / 表情

Step 1: Choose appearance
[White Lamb] [Cream Lamb] [Brown Lamb] [Curly Lamb]

Step 2: Name your lamb
输入框：Mochi

Step 3: Choose reminder tone
[Gentle] [Tsundere] [Roast] [Coach] [Low-interruption]

[Primary Button] Confirm Lamb
```

### 加入者确认视图

```txt
Beiqi created this lamb:

[小羊预览]
Name: Mochi
Appearance: Cream Lamb
Tone: Gentle

[Primary Button] Looks good, start together
[Secondary Button] Suggest changes
```

### 点击行为

- 创建者完成设置 → 等待加入者确认。
- 加入者确认 → 创建 Pair Lamb → Room 状态变为 `active` → 进入 Today。
- Suggest changes → MVP 可返回创建者重新编辑；实时协同放到后续版本。

---

## 8.6 主 Tab 结构

MVP 主导航使用 4 个 Tab：

```txt
[Today] [Meadow] [Shop] [Buddy]
```

### Tab 设计原则

- **Today**：任务行动入口。
- **Meadow**：情感反馈和小羊照顾入口。
- **Shop**：资源消耗和装扮入口。
- **Buddy**：双人关系和活动记录入口。

Calendar / 日程放到 V1，不进入 MVP 主导航。

---

## 8.7 Today / 今日页面

### 页面目标

让用户快速看到今天要做什么、完成任务、获得对应奖励。

### 页面结构

```txt
顶部区域：
Good afternoon, Beiqi
Mochi is waiting in the Meadow.
[Baa Coins: 25] [Basic Hay: 2]

[今日进度卡片]
Today Progress
Personal: 2/4 completed
Shared: 0/1 completed

[小羊提醒气泡]
Mochi: 今天先完成一个小任务也可以咩。

[Segmented Control]
Personal Tasks | Shared Tasks

Personal Tasks:
[Task Card]
- Title: Study 30 mins
- Difficulty: Medium
- Visibility: Status only
- Reward: Premium Clover + 12 Baa Coins
- [Complete]

[Task Card]
- Title: Apply for 2 jobs
- Reward: Basic Hay + 5 Baa Coins
- [Complete]

Shared Tasks:
[Shared Task Card]
- Title: Evening walk
- Status: Waiting for both
- Reward: Home EXP + flower path
- Beiqi: pending / Alice: pending
- [Mark my part done]

底部浮动按钮：+ Add Task
```

### 关键组件

- 用户问候
- 资源摘要
- 今日进度
- 小羊提醒气泡
- Personal / Shared 切换
- 个人任务卡片
- 共同任务卡片
- Add Task 按钮

### 个人任务卡片字段

- 任务标题
- 难度
- 可见性
- 到期时间
- 奖励预览
- 完成按钮

### 共同任务卡片字段

- 任务标题
- 难度
- 双方完成状态
- 奖励背景元素预览
- Mark my part done 按钮

### 点击行为

- Complete 个人任务 → 弹出 Reward Modal → 可选择 Feed now 或 Later。
- Mark my part done → 任务进入 `partially_completed`；如果对方已完成，则进入 `completed`。
- + Add Task → 打开 Add Task Sheet。

---

## 8.8 Add Task Sheet / 添加任务弹窗

### 页面目标

快速创建个人任务或共同任务。

### 页面结构

```txt
Bottom Sheet: Add Task

Task type:
[Personal Task] [Shared Task]

Title:
[输入框]

Difficulty:
[Easy] [Medium] [Hard]

Due:
[Today] [Tomorrow] [Pick date]

Visibility: 仅 Personal Task 显示
[Private] [Status only] [Visible to buddy]

Reward preview:
Personal: Basic Hay + Baa Coins
Shared: Home EXP + background element

[Primary Button] Create Task
```

### 规则

- Personal Task 默认 assignedTo 当前用户。
- Shared Task 默认 assignedTo 两个用户。
- Personal Task 显示隐私设置。
- Shared Task 不显示隐私设置，默认双方可见。

---

## 8.9 Reward Modal / 奖励反馈弹窗

### 个人任务完成后

```txt
[小羊开心动画]
You did it!

Reward:
+ Premium Clover
+ 12 Baa Coins
+ Bond with Mochi

[Primary Button] Feed Mochi now
[Secondary Button] Save for later
```

### 共同任务完成后

```txt
[双人庆祝动画 / 小羊蹦跳]
You completed this together!

Meadow Reward:
+ Home EXP
+ Flower Path background element

[Primary Button] Place in Meadow
[Secondary Button] Later
```

### 点击行为

- Feed now → 跳到 Meadow，并打开喂食面板。
- Save for later → 回到 Today。
- Place in Meadow → 跳到 Meadow，进入背景元素放置模式。

---

## 8.10 Meadow / 草地页面

### 页面目标

展示小羊、喂养互动、查看 Meadow 建设成果。

### 页面结构

```txt
顶部资源栏：
Mochi's Meadow
Home Lv. 3     Baa Coins: 25

[Meadow 背景区域]
- 当前背景：温暖草地
- 已放置元素：小花、小石路、小木牌
- 小羊 Mochi 站在草地中间

[小羊状态卡]
Fullness: 70/100
Mood: Happy
Lamb Lv. 2

[Bond 卡片]
Your Bond: Lv. 3
Buddy Bond: Lv. 2

[互动按钮]
[Feed] [Pat] [Play]

[小羊气泡]
Mochi: 今天的小草很好吃咩。

[Locked Preview]
Sheep Pen: Locked until Home Lv. 7
```

### 关键组件

- Meadow 背景展示区
- 小羊形象
- 饱腹值 / 心情值 / Lamb Level
- 双方 Bond 摘要
- Feed / Pat / Play 按钮
- 小羊气泡
- Sheep Pen locked 预览

### 点击行为

- Feed → 打开 Feed Sheet。
- Pat → 小羊播放亲密互动动画，少量增加 mood 或 Bond。
- Play → 如果有玩具，播放互动动画。
- 点击背景元素 → 查看来源：由哪个共同任务解锁。

---

## 8.11 Feed Sheet / 喂小羊弹窗

### 页面结构

```txt
Bottom Sheet: Feed Mochi

Inventory:
[Basic Hay x2]
[Premium Clover x1]
[Berry Treat x0]

Selected item effect:
Fullness +20
Bond +5
Mood +5

[Primary Button] Feed
```

### 点击行为

- 选择食物 → 显示效果。
- Feed → 消耗库存 → 增加 fullness / mood / Bond → 播放吃草动画。

---

## 8.12 Shop / 商店页面

### 页面目标

让用户消耗 Baa Coins 购买生活用品。MVP 中 Shop 主要服务个人任务奖励线，不负责主要背景建设。

### 页面结构

```txt
顶部：Shop
Baa Coins: 25

[Category Tabs]
Food | Snacks | Toys | Clothes

Food:
[Item Card]
Basic Hay
Cost: 10 Baa Coins
Effect: Fullness +20
[Buy]

[Item Card]
Premium Clover
Cost: 25 Baa Coins
Effect: Fullness +45
[Buy]

Clothes:
[Item Card]
Little Scarf
Cost: 60 Baa Coins
Unlocks outfit
[Buy]
```

### MVP 商店范围

- Food：Basic Hay、Premium Clover。
- Snacks：Berry Treat。
- Toys：Small Ball。
- Clothes：Little Scarf、Sleepy Hat、Study Glasses。

### 规则

- 生活用品可以用 Baa Coins 购买。
- 背景元素主要通过共同任务获得，不主要在 Shop 购买。
- 活动限定物品暂不进入 MVP。

---

## 8.13 Buddy / 搭子页面

### 页面目标

展示两个人的贡献、Bond、共同进展和活动记录。

### 页面结构

```txt
顶部：Buddy
You & Alice are raising Mochi together.

[Pair Summary Card]
Together for: 12 days
Home Level: Lv. 3
Shared tasks completed: 8

[Bond Comparison - 非竞争式]
Beiqi Bond: Lv. 3
Alice Bond: Lv. 2
提示：Bond 代表各自和 Mochi 的互动，不是排名。

[Today Contribution]
Beiqi: 2 personal tasks completed
Alice: 1 personal task completed
Shared: 0/1 completed

[Activity Log]
- Beiqi completed “Study 30 mins”
- Alice fed Mochi with Premium Clover
- You both completed “Evening Walk”
- Mochi unlocked Flower Path

[Room Actions]
[Invite info] [Privacy settings] [Leave Pair Room]
```

### 关键组件

- Pair 关系摘要
- Home Level
- 双方 Bond
- 今日贡献
- 活动记录
- 房间设置入口

### 设计原则

- 不做排行榜。
- 不突出“谁更差”。
- 用温和文案解释 Bond 不是竞争。
- 共同任务完成情况比个人比较更重要。

---

## 8.14 Privacy Settings / 隐私设置

MVP 中可以作为 Buddy 页里的设置弹窗，不需要单独 Tab。

### 页面结构

```txt
Privacy Settings

Personal task visibility default:
[Private]
[Status only]
[Visible to buddy]

Activity log detail:
[Show task title]
[Show completion only]

[Save]
```

### 规则

- 共同任务默认双方可见。
- 个人任务可配置默认可见性。
- Activity Log 可选择显示标题或只显示完成状态。

---

## 8.15 Leave / Archive Flow / 退出与归档流程

MVP 可以做最简版本，不实现完整冷静期 UI。

### 页面结构

```txt
Leave Pair Room?

BaaDo is built for two people.
If you leave, Mochi's Meadow will be archived and cannot continue as a solo room.

You and your buddy can still view the memory later.

[Secondary Button] Cancel
[Danger Button] Leave and Archive
```

### 点击行为

- Cancel → 关闭弹窗。
- Leave and Archive → 二次确认 → Room 状态变为 `archived`。

### MVP 简化规则

- 一方退出后，Pair Room 直接 archived。
- 完整 cooling-off、恢复、Memory Album 放到 V1。

---

## 8.16 Empty States / 空状态

### Today 无任务

```txt
Mochi is nibbling grass quietly.
Create your first task to earn some hay.
[Add Personal Task]
[Add Shared Task]
```

### Meadow 没有背景元素

```txt
Your Meadow is still simple.
Complete shared tasks together to unlock flowers, paths, and decorations.
```

### Shop 金币不足

```txt
Not enough Baa Coins.
Complete personal tasks to earn more.
```

### Buddy 共同任务还没有完成记录

```txt
No shared tasks completed yet.
Start with something small together.
```

---

## 8.17 MVP 页面优先级

### P0 必须做

1. Welcome
2. Create / Invite Pair Room
3. Join Pair Room
4. Lamb Setup
5. Today
6. Add Task Sheet
7. Reward Modal
8. Meadow
9. Feed Sheet
10. Shop
11. Buddy
12. Basic Activity Log
13. Leave / Archive Flow

### P1 建议做

1. Privacy Settings
2. 更完整的 Activity Log 过滤
3. Room Settings
4. 更完整的 Shop 分类

### P2 可后移

1. 更完整的商店分类
2. 更完整的房间设置
3. Memory Album
4. Calendar
5. Events

---

## 9. 数据模型初稿

## 9.1 User

```ts
interface User {
  id: string;
  displayName: string;
  avatar?: string;
  activeRoomId?: string;
  createdAt: string;
}
```

## 9.2 Room

```ts
interface Room {
  id: string;
  name: string;
  mode: 'pair';
  status: 'pending_pair' | 'lamb_setup' | 'active' | 'paused' | 'ending' | 'archived';
  ownerId: string;
  inviteCode: string;
  memberIds: string[]; // active 状态下必须正好 2 个用户
  lambId?: string;
  homeLevel: number;
  homeExp: number;
  createdAt: string;
  activatedAt?: string;
  pausedAt?: string;
  endingRequestedBy?: string;
  endingRequestedAt?: string;
  archivedAt?: string;
  lastStatusChangedAt?: string;
}
```

## 9.3 Lamb

```ts
interface Lamb {
  id: string;
  roomId: string;
  name: string;
  appearance: 'white' | 'cream' | 'brown' | 'curly';
  level: number;
  exp: number;
  fullness: number;
  mood: number;
  currentOutfitId?: string;
  currentBackgroundId?: string;
  unlockedActionIds: string[];
  unlockedPhraseIds: string[];
  createdBy: string;
  createdAt: string;
}
```

## 9.4 Task

```ts
interface Task {
  id: string;
  roomId: string;
  title: string;
  description?: string;
  type: 'personal' | 'shared';
  assignedTo: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  visibility: 'private' | 'status_only' | 'visible_to_buddy';
  status: 'pending' | 'partially_completed' | 'completed' | 'expired';
  dueDate?: string;
  repeatRule?: string;
  createdBy: string;
  completedBy: string[];
  completedAt?: string;
  partiallyCompletedAt?: string;
  rewardType: 'lamb_care' | 'meadow_building';
  rewardItems: string[];
}
```

## 9.5 Bond

```ts
interface Bond {
  id: string;
  roomId: string;
  userId: string;
  lambId: string;
  level: number;
  points: number;
  unlockedPersonalPhraseIds: string[];
}
```

## 9.6 InventoryItem

```ts
interface InventoryItem {
  id: string;
  roomId: string;
  itemId: string;
  category: 'food' | 'snack' | 'toy' | 'clothing' | 'background_element' | 'decoration';
  quantity: number;
  ownedBy?: string; // undefined = room/shared inventory
}
```

## 9.7 ActivityLog

```ts
interface ActivityLog {
  id: string;
  roomId: string;
  actorUserId: string;
  type:
    | 'task_completed'
    | 'shared_task_partially_completed'
    | 'shared_task_completed'
    | 'lamb_fed'
    | 'item_bought'
    | 'level_up'
    | 'bond_up'
    | 'room_paused'
    | 'room_resumed'
    | 'room_archived';
  message: string;
  createdAt: string;
}
```

## 9.8 ScheduleBlock（V1+）

```ts
interface ScheduleBlock {
  id: string;
  roomId: string;
  userId: string;
  title?: string;
  type: 'free' | 'busy' | 'task' | 'shared_task';
  visibility: 'free_busy_only' | 'title_only' | 'full_detail';
  startTime: string;
  endTime: string;
  linkedTaskId?: string;
  source: 'manual' | 'google_calendar' | 'apple_calendar' | 'outlook_calendar';
  createdAt: string;
}
```

## 9.9 Invitation

```ts
interface Invitation {
  id: string;
  roomId: string;
  createdBy: string;
  inviteCodeHash: string;
  inviteTokenHash: string;
  status: 'active' | 'used' | 'revoked' | 'expired';
  expiresAt: string;
  usedBy?: string;
  usedAt?: string;
  createdAt: string;
}
```

## 9.10 BaaBalance

```ts
interface BaaBalance {
  id: string;
  userId: string;
  roomId: string;
  balance: number;
  updatedAt: string;
}
```

## 9.11 RewardLedger

```ts
interface RewardLedger {
  id: string;
  roomId: string;
  userId?: string;
  taskId?: string;
  rewardType: 'lamb_care' | 'meadow_building' | 'event_reward';
  rewardItems: string[];
  baaCoinsDelta?: number;
  idempotencyKey: string;
  status: 'pending' | 'granted' | 'failed' | 'reversed';
  createdAt: string;
}
```

## 9.12 AuditLog

```ts
interface AuditLog {
  id: string;
  actorUserId: string;
  roomId?: string;
  action:
    | 'room_created'
    | 'invite_created'
    | 'invite_used'
    | 'room_joined'
    | 'room_status_changed'
    | 'lamb_created'
    | 'task_completed'
    | 'reward_granted'
    | 'visibility_changed'
    | 'room_archived';
  metadata?: Record<string, string | number | boolean>;
  createdAt: string;
}
```

---

## 10. 安全、隐私与防攻击设计

BaaDo / 咩Do 虽然是轻量可爱的 Todo 养成产品，但它本质上是一个**双人关系 + 私人任务 + 共同空间**产品。安全和隐私必须按更严格标准设计：默认少收集、默认少暴露、默认不可越权、默认可撤回。

核心原则：

> 用户数据默认私密；共享必须明确授权；所有敏感操作必须后端校验；任何一方都不能通过产品控制、骚扰或窥探另一方。

安全目标包括：

- 防止陌生人通过邀请码进入别人的 Pair Room。
- 防止用户越权查看或修改不属于自己的任务、库存、小羊、Meadow。
- 防止邀请码被暴力猜测或转发滥用。
- 防止一方恶意删除、归档、篡改共同资产。
- 防止个人任务、日程、活动记录泄露给搭子或其他用户。
- 防止前端篡改奖励、Baa Coins、Bond、Home EXP。
- 防止未来社交功能造成骚扰、垃圾内容、隐私暴露。
- 防止 AI 小羊推送生成攻击性、羞辱性、不安全或泄露隐私的内容。

---

## 10.1 隐私优先原则 / Privacy by Default

### 默认私密

MVP 的默认设置应更保守：

- 个人任务默认 `private`。
- Activity Log 默认只显示完成状态，不显示个人任务标题。
- 共同任务默认双方可见。
- Bond 展示只显示等级，不显示详细行为明细。
- Meadow 只对 Pair Room 内两人可见。
- 未来社交功能默认关闭公开展示。
- 未来日历同步默认不启用。

### 明确授权后才共享

任何从“私密”变成“共享”的行为都需要用户主动选择。

例如：

- 把个人任务从 `private` 改成 `visible_to_buddy`。
- 公开 Meadow 卡片。
- 开启小羊社交。
- 开启日历同步。
- 共享事件标题或完整日历详情。

不允许使用模糊文案，例如“提升体验”来暗示用户开放更多隐私。

### 数据最小化

只收集实现功能所必需的数据：

- 不收集精确生日。
- 不收集通讯录，除非未来邀请功能明确需要且用户授权。
- 不读取完整日历详情，除非用户明确选择。
- 不保存不必要的设备标识。
- 不保存任务完成以外的过度行为轨迹。

---

## 10.2 账号与登录安全

### MVP 建议

建议使用成熟认证服务，不自建简陋密码系统。

推荐：

- Apple Sign in。
- Google Sign in。
- Email magic link / OTP。
- Supabase Auth、Firebase Auth、Clerk 或 Auth0。

### 基本规则

- 每个后端请求必须从 auth token 解析当前 `userId`。
- 前端本地存储的 userId 不可信。
- 所有数据读写都必须在后端或数据库规则中校验权限。
- 用户退出或归档后，只能查看允许保留的 archived 数据，不能继续修改。

### 会话安全

- Access token 有效期不宜过长。
- Refresh token 安全存储，移动端使用 Keychain / Secure Storage。
- 用户可以主动登出所有设备。
- 账号删除后，相关 token 必须失效。
- 对异常登录或频繁失败尝试做限制。

---

## 10.3 Pair Room 邀请安全

Pair Room 是严格双人空间，邀请安全非常关键。

### 邀请码 / 邀请链接规则

邀请码不能使用容易猜的短数字，例如 `123456`。

建议：

- 邀请码至少 10–12 位。
- 邀请链接使用高熵随机 token。
- 邀请 token 只存 hash，不直接明文存数据库。
- 邀请链接默认 24 小时过期，最多不超过 7 天。
- 邀请被使用后立即失效。
- Pair Room 已满后，邀请链接自动失效。
- 创建者可以手动撤销并重新生成邀请。

### 加入 Pair Room 时必须检查

1. 邀请是否存在。
2. 邀请是否过期。
3. 邀请是否已被使用。
4. Pair Room 是否还处于 `pending_pair`。
5. Pair Room 是否已有两个成员。
6. 当前用户是否已经在 active Pair Room 中。
7. 当前用户是否就是创建者本人。
8. 当前账号是否处于风控限制状态。

### 防暴力猜测

- Join Invite 接口必须 rate limit。
- 同一 IP、同一设备、同一账号连续失败后临时限制。
- 错误提示必须模糊，不暴露房间是否存在、创建者是谁、房间状态是什么。

推荐错误提示：

> “这个邀请无效或已经过期，请让你的搭子重新发送邀请。”

避免提示：

> “邀请码存在，但房间 ID 是 xxx，创建者是 xxx。”

---

## 10.4 数据权限与访问控制

权限模型：

> 用户只能访问自己所在 Pair Room 的数据，并且只能按角色、任务可见性和 Room 状态执行允许的操作。

### Room 权限规则

| 操作 | 允许条件 |
|---|---|
| 查看 active Room | 当前用户在 `memberIds` 中 |
| 查看 archived Room | 当前用户曾经在 `memberIds` 中 |
| 加入 Room | Room 为 `pending_pair`，成员数小于 2，邀请有效 |
| 创建 Pair Lamb | Room 为 `lamb_setup`，当前用户在 `memberIds` 中 |
| 修改 Room 基础信息 | 当前用户在 `memberIds` 中，Room 为 `active` |
| 暂停 Room | 当前用户在 `memberIds` 中，需记录操作者 |
| 恢复 Room | MVP 可要求双方确认；至少需要通知另一方 |
| 归档 Room | 当前用户在 `memberIds` 中，需要二次确认并写入 audit log |

### Task 权限规则

| 数据 / 操作 | 权限 |
|---|---|
| 个人任务 `private` | 只有创建者可查看标题和详情 |
| 个人任务 `status_only` | 搭子只能看到完成状态，看不到标题和详情 |
| 个人任务 `visible_to_buddy` | 双方可查看标题和状态 |
| 共同任务 | 双方可查看 |
| 完成个人任务 | 只有 assigned 用户可完成 |
| 完成共同任务的一方进度 | 只有当前用户能标记自己的部分 |
| 修改个人任务 | 只有创建者可修改 |
| 删除个人任务 | 只有创建者可删除 |
| 修改共同任务 | MVP 建议创建者修改；更严格版本需要双方确认 |
| 删除共同任务 | 需要双方确认，或只允许归档不硬删除 |

### Inventory 权限规则

- 个人生活用品属于获得者或购买者。
- 背景元素属于 Room shared inventory。
- 用户不能消耗对方的个人物品。
- 双方可以使用已解锁的共同背景元素。
- 对共同资产的删除、替换、归档需要记录操作者。

---

## 10.5 后端校验与防客户端篡改

前端展示的数值不能作为可信来源。

后端必须校验：

- 用户是否属于该 Room。
- Room 是否处于允许操作的状态。
- 用户是否真的拥有这个任务。
- 用户是否有权查看该任务内容。
- 任务是否已经完成。
- 任务是否过期。
- 奖励是否已经发放过。
- 用户是否有足够 Baa Coins。
- 用户是否拥有要使用的物品。
- 共同任务是否由双方分别确认。

必须避免：

- 前端直接传 `rewardCoins: 9999`。
- 前端直接修改 Bond / Home EXP。
- 前端直接把 Room 状态改成 active。
- 前端直接添加背景元素到 Inventory。
- 前端直接伪造对方已完成共同任务。

推荐后端逻辑：

```txt
completeTask(taskId, userId)
  → 后端读取 task
  → 校验 userId 权限
  → 校验 task 状态
  → 根据服务端规则计算奖励
  → 使用事务写入 reward / inventory / bond / activity log
  → 标记 reward 已发放，防止重复领取
```

### 并发与重复请求

必须处理：

- 用户重复点击 Complete。
- 网络重试导致重复领取奖励。
- 两人同时完成共同任务。
- 两人同时修改 Meadow 背景。
- 活动开始时大量用户同时完成任务、领取奖励或购买物品。
- 同一时间有大量邀请链接被打开或加入 Pair Room。

建议：

- 关键操作使用幂等键 idempotency key。
- 奖励发放使用事务。
- 对 Task 完成状态加服务端状态机校验。
- ActivityLog 不作为唯一事实来源，只作为审计和展示。

---

## 10.6 高并发处理与系统可靠性

BaaDo / 咩Do 需要提前处理高并发场景。即使 MVP 用户量不大，也应该按可扩展架构设计关键写操作，避免将来活动上线、推送触发或用户同时点击导致奖励重复、状态错乱或数据库被打爆。

目标场景：

> 系统需要能承受至少 2000 个用户在短时间内同时点击任务完成、喂小羊、领取奖励、加入房间或放置 Meadow 背景元素。

这里的目标不是保证所有请求瞬间完成，而是保证：

- 数据不乱。
- 奖励不重复发。
- 用户不会越权。
- 系统不会崩溃。
- 高峰期可以排队、降级或稍后处理。

### 10.6.1 高并发重点场景

| 场景 | 风险 | 处理原则 |
|---|---|---|
| 2000 人同时点击 Complete | 重复发奖励、任务状态错乱 | 幂等键 + 事务 + 状态机 |
| 两人同时完成共同任务 | 共同任务被重复结算 | 原子更新 + reward ledger |
| 同一用户连续点 Feed | 重复扣库存或重复加 Bond | 用户级幂等 + 库存事务 |
| 活动开启后同时领取奖励 | 库存 / 活动积分异常 | 异步队列 + 防重复领取 |
| 大量用户同时加入 Pair Room | 房间超员、邀请重复使用 | 邀请 token 原子消费 |
| 大量推送同时触发 | 推送服务拥堵 | 队列 + 批处理 + 限速 |
| 多人同时刷新 Today 页面 | 读请求压力大 | 缓存 + 分页 + 只读副本 |

### 10.6.2 幂等设计

所有关键写操作都必须支持幂等。

关键操作包括：

- completeTask
- markSharedTaskPartDone
- claimReward
- feedLamb
- buyItem
- placeBackgroundElement
- joinPairRoom
- createPairLamb
- archiveRoom

每个关键请求都应带 `idempotencyKey`。

推荐格式：

```txt
idempotencyKey = userId + actionType + targetId + clientRequestId
```

后端处理规则：

1. 收到请求后先检查 `idempotencyKey` 是否已处理。
2. 如果已处理，直接返回上次结果。
3. 如果未处理，创建 processing 记录。
4. 执行业务逻辑。
5. 写入结果并标记 completed。
6. 如果中途失败，标记 failed，并允许安全重试。

这样可以防止：

- 用户狂点按钮。
- 网络超时后 App 自动重试。
- 前端误发重复请求。
- 同一请求在网关层被重放。

### 10.6.3 数据库事务与行级锁

关键状态变更必须在数据库事务里完成。

例如完成个人任务：

```txt
BEGIN TRANSACTION
  SELECT task FOR UPDATE
  校验 task.status = pending
  校验 userId = task.assignedTo
  UPDATE task.status = completed
  INSERT reward_ledger
  UPDATE inventory / baa_coins / bond / lamb_exp
  INSERT activity_log
COMMIT
```

共同任务完成建议使用原子状态机：

```txt
pending
  → partially_completed
  → completed
```

当第二个用户完成共同任务时，必须在同一个事务中：

- 锁定 Task。
- 检查 completedBy 是否已经包含当前用户。
- 添加当前用户。
- 判断双方是否都完成。
- 如果双方都完成，才发放共同奖励。
- 写入 reward ledger，防止重复结算。

### 10.6.4 Reward Ledger / 奖励账本

所有奖励发放都应该写入奖励账本，而不是只更新余额。

建议新增数据模型：

```ts
interface RewardLedger {
  id: string;
  roomId: string;
  userId?: string;
  taskId?: string;
  rewardType: 'lamb_care' | 'meadow_building' | 'event_reward';
  rewardItems: string[];
  idempotencyKey: string;
  status: 'pending' | 'granted' | 'failed' | 'reversed';
  createdAt: string;
}
```

奖励账本作用：

- 防止重复领取。
- 方便审计。
- 方便回滚异常奖励。
- 方便统计活动奖励。
- 避免只看余额无法追踪来源。

数据库层建议设置唯一约束：

```txt
UNIQUE(taskId, userId, rewardType)
UNIQUE(idempotencyKey)
```

对于共同任务奖励：

```txt
UNIQUE(taskId, roomId, rewardType)
```

### 10.6.5 队列与异步处理

不是所有事情都应该同步完成。

同步处理：

- 任务状态更新。
- 防重复校验。
- 核心奖励账本写入。
- 基础库存 / Baa Coins / Bond 更新。

异步处理：

- Activity Log 展示消息生成。
- 推送通知。
- 成就检查。
- 季节活动积分统计。
- 排行 / 统计类数据。
- 图片或分享卡片生成。
- AI 文案生成。

推荐架构：

```txt
API Request
   ↓
Validate + Transactional Write
   ↓
Outbox Event
   ↓
Queue Worker
   ↓
Notification / Achievement / Event Progress / Analytics
```

使用 Outbox Pattern 可以避免数据库写入成功但队列消息丢失。

### 10.6.6 限流、节流与降级

高峰期需要主动保护系统。

建议限流策略：

| 接口 | 限流建议 |
|---|---|
| Join Invite | 严格限流，防暴力猜测 |
| Complete Task | 用户级限流，例如每秒 2–5 次 |
| Feed Lamb | 用户级限流，例如每秒 1–3 次 |
| Buy Item | 用户级限流 + 事务校验余额 |
| Push Reminder | 房间级 / 用户级限速 |
| Public Social API | IP + 用户双重限流 |

降级策略：

- 推送延迟发送。
- 活动积分稍后刷新。
- Activity Log 延迟出现。
- AI 文案回退模板文案。
- 非关键动画和统计暂时不刷新。
- Shop 图片和非关键资源走 CDN 缓存。

必须避免降级影响：

- 任务完成状态。
- 奖励账本。
- 用户余额。
- Room 权限。
- 隐私权限。

### 10.6.7 读写分离与缓存

高并发下，读请求通常比写请求更多。

建议：

- Today 页面只拉取必要任务，不一次拉全量历史。
- Activity Log 分页加载。
- Shop 静态商品表可缓存或 CDN 化。
- 小羊装扮、背景配置属于静态配置，可版本化缓存。
- 用户余额、库存、任务状态这类强一致数据不应只依赖缓存。

缓存原则：

- 静态配置可以强缓存。
- 个人任务和隐私数据不放公开缓存。
- Room 内数据缓存必须按 userId + roomId 做权限隔离。
- private 任务内容不能进入共享缓存。

### 10.6.8 2000 同时点击的处理策略

当 2000 个用户同时点击 Complete 时，推荐处理链路：

```txt
1. API Gateway 接收请求
2. Auth 校验 userId
3. Rate limit 检查
4. Idempotency key 检查
5. 进入 completeTask 服务
6. DB transaction + row lock
7. 状态机校验
8. Reward ledger 写入
9. Inventory / Bond / Home EXP 更新
10. Outbox event 写入
11. 返回成功结果
12. Worker 异步处理通知、活动积分、成就、统计
```

如果瞬间压力超过系统承载：

- 对非关键请求返回 `429 Too Many Requests`。
- 对可排队请求返回 `202 Accepted`，提示稍后刷新。
- 对关键状态写请求保持事务一致性。
- 前端展示：`Mochi 收到啦，奖励正在路上咩。`

### 10.6.9 监控与告警

需要监控：

- API p95 / p99 延迟。
- 错误率。
- 429 数量。
- DB lock wait time。
- 队列积压长度。
- reward ledger 重复冲突次数。
- idempotency retry 次数。
- completeTask 成功率。
- joinPairRoom 失败率。
- 推送延迟。

告警阈值示例：

- completeTask 错误率 > 1%。
- DB lock wait p95 > 500ms。
- 队列积压超过 5 分钟未消化。
- reward ledger duplicate conflict 突然升高。
- Join Invite 失败率异常升高，可能是暴力猜测。

### 10.6.10 高并发 Checklist

- [ ] 所有关键写接口支持 idempotency key。
- [ ] completeTask 使用事务和状态机校验。
- [ ] sharedTask 只在双方完成后结算一次。
- [ ] feedLamb 校验库存并在事务中扣减。
- [ ] buyItem 校验余额并在事务中扣减。
- [ ] joinPairRoom 原子消费 invite token。
- [ ] createPairLamb 只能在 `lamb_setup` 状态执行一次。
- [ ] reward ledger 有唯一约束，防重复奖励。
- [ ] Activity Log 和推送异步处理。
- [ ] 统计、活动积分、成就系统可以延迟刷新。
- [ ] 关键权限和奖励不依赖缓存。
- [ ] Today / Activity Log 支持分页或增量加载。
- [ ] API 有用户级、IP 级、接口级限流。
- [ ] 高峰期 AI 文案可回退模板。
- [ ] 有 API、DB、队列、奖励冲突监控。

---

## 10.7 数据存储、保留与删除

### 数据分类

建议把数据按敏感程度分类：

| 数据类型 | 敏感程度 | 说明 |
|---|---|---|
| 用户 ID、登录信息 | 高 | 必须受 auth 保护 |
| 个人任务标题 / 描述 | 高 | 默认 private |
| 共同任务 | 中高 | 只限 Pair Room 双方 |
| 活动记录 | 中 | 可能泄露生活规律 |
| Bond / Home Level | 中 | 不应公开比较 |
| Meadow 外观 | 低到中 | 未来公开前需用户授权 |
| 日历数据 | 极高 | 默认不收集，不默认共享 |

### 删除与导出

用户应拥有基本数据控制权：

- 可以删除自己的账号。
- 可以导出自己的数据。
- 可以删除或归档自己的个人任务。
- Pair Room archived 后，应明确哪些数据会保留。
- 删除账号时，对方的 Pair Room 历史如何展示需要提前定义。

### 归档后的数据

Room archived 后：

- 不再允许新增任务、喂小羊、修改 Meadow。
- 两个用户可以查看历史摘要。
- private 个人任务仍然只对创建者可见。
- 如果一方删除账号，另一方只能看到非私密历史摘要。

---

## 10.8 任务与内容安全

用户可以输入任务标题、昵称、小羊名字，因此需要基本内容安全。

### 输入限制

建议限制：

- 昵称长度：2–30 字符。
- 小羊名字长度：1–20 字符。
- 任务标题长度：1–80 字符。
- 任务描述长度：0–500 字符。
- 禁止空白标题。
- 禁止脚本注入内容。
- 禁止控制字符和不可见字符滥用。
- 前后端都做输入校验。

### XSS / 注入防护

规则：

- 不信任任何用户输入。
- 展示用户输入时做转义或安全渲染。
- 后端使用参数化查询，避免 SQL injection。
- 不允许用户输入成为数据库查询结构的一部分。
- 不把用户输入直接拼接到 prompt、SQL、HTML 或 URL 中。

### 不安全内容

MVP 可以不做复杂内容审核，但要预留：

- 举报数据结构。
- 拉黑数据结构。
- 内容审核状态字段。
- 公开展示前的审核机制。

未来社交系统开放前必须加入举报、拉黑、内容审核和公开范围控制。

---

## 10.9 双人关系安全与防滥用

因为 BaaDo / 咩Do 是双人关系产品，需要避免一方通过产品骚扰、控制、监视或攻击另一方。

### 必须避免的设计

- 退出时羞辱用户。
- 用小羊哭泣强迫用户留下。
- 给对方发送责备式通知。
- 显示“谁拖后腿”的公开排名。
- 让一方无限频繁提醒另一方。
- 允许一方未经确认删除全部共同资产。
- 默认暴露个人任务标题或日程细节。
- 用连续打卡惩罚制造关系压力。

### MVP 保护规则

- Leave / Archive 需要二次确认。
- 归档后双方仍可查看基本历史，但不能继续修改。
- 不做公开失败榜。
- Bond 展示必须说明不是排名。
- 推送频率可设置低打扰。
- 一方不能伪造另一方完成共同任务。
- 对另一方的提醒请求需要频率限制。
- Activity Log 不展示 private 任务标题。

### 防骚扰设置

V1 应加入：

- 静音搭子提醒。
- 限制对方发起提醒频率。
- 退出关系的安全流程。
- 拉黑 / 不再接受该用户邀请。
- 举报滥用行为。

---

## 10.10 AI / 小羊推送安全

MVP 阶段更推荐使用模板文案，而不是开放式 AI 生成。

如果后续使用 AI 生成小羊提醒文案，需要额外安全层。

### AI 文案边界

小羊可以：

- 催促任务。
- 轻微吐槽拖延行为。
- 鼓励补救。
- 用可爱语气提醒。

小羊不能：

- 羞辱人格。
- 身体羞辱。
- 关系攻击。
- 引导自责或自我伤害。
- 生成歧视性内容。
- 泄露另一方 private task 内容。
- 根据一方隐私任务生成给另一方看的提醒。
- 生成医疗、法律、金融等高风险建议。

### AI 上下文最小化

AI 输入只提供必要上下文：

- 可以提供：任务是否完成、任务类型、公开可见的任务标题、提醒语气。
- 不提供：private 任务标题、任务描述、日历详情、关系状态原因、用户敏感信息。

### 输出过滤

- Roast / 毒舌模式必须有硬边界。
- 敏感主题回退到温和模板。
- 输出经过安全词和意图过滤。
- 用户可以切换到低打扰 / 非毒舌模式。

---

## 10.11 日历同步安全（V2）

日历同步放到 V2，但需要提前设计隐私原则。

默认规则：

- 默认不启用日历同步。
- 默认只共享 free / busy。
- 不默认共享事件标题。
- 不默认共享地点、备注、参会人。
- 用户可以随时关闭日历同步。
- 撤销权限后停止拉取新数据。
- 日历 token 必须加密存储。
- 日历数据应设置短期缓存，不长期保存完整原始日历。

共享级别：

1. **Free / Busy only**：最安全，默认选项。
2. **Title only**：只显示标题，不显示详情。
3. **Full detail**：只适合高度信任关系，需要明显风险提示。
4. **AI compute only**：系统计算共同空闲，不向对方展示原始详情。

### 日历隐私提示

开启前必须显示：

> “默认情况下，你的搭子只能看到你是否有空，看不到事件名称、地点、备注或参与人。”

---

## 10.12 未来小羊社交安全

小羊社交必须默认关闭。

开启前必须让用户选择公开范围：

- 仅自己和搭子可见。
- 仅小羊好友可见。
- 公开展示。

其他 Pair Room 最多只能看到：

- 小羊名字。
- 小羊外观。
- 已公开装扮。
- 公开 Meadow 背景。
- 公开活动徽章。

不能看到：

- 个人任务内容。
- 共同任务内容。
- 日程信息。
- Bond 详细比较。
- Room 退出 / 暂停 / archived 原因。
- 未公开的纪念册内容。

必须支持：

- 拉黑。
- 举报。
- 删除留言或贴纸。
- 控制 Meadow 是否公开。
- 控制是否允许小羊好友申请。
- 关闭小羊互访。

---

## 10.13 审计日志与异常监控

MVP 建议记录关键操作 audit log，用于排查争议和安全问题。

需要记录：

- 创建 Pair Room。
- 邀请生成、撤销、使用。
- 用户加入 Pair Room。
- Room 状态变化。
- 创建 Pair Lamb。
- 完成任务。
- 发放奖励。
- 使用 / 购买物品。
- 修改任务可见性。
- 归档 / 退出 Room。

Audit log 应记录：

- actorUserId。
- roomId。
- action。
- createdAt。
- metadata 摘要。

注意：audit log 不应记录 private 任务完整内容，避免二次泄露。

---

## 10.14 技术安全 Checklist

MVP 至少需要检查：

- [ ] 使用成熟 Auth，不自建简陋密码系统。
- [ ] 所有后端请求都从 auth token 解析 userId。
- [ ] 所有 Room / Task / Inventory 操作都做 ownership 和 Room status 校验。
- [ ] 邀请码高熵、可过期、一次性使用。
- [ ] 邀请 token 只存 hash。
- [ ] Join Invite 接口有 rate limit。
- [ ] 错误提示不泄露房间是否存在或创建者信息。
- [ ] 后端计算奖励，不相信前端传入奖励值。
- [ ] 关键写操作使用事务或幂等机制。
- [ ] 防止重复领取奖励。
- [ ] 防止一方代替另一方完成共同任务。
- [ ] 个人任务 private / status_only / visible_to_buddy 权限正确。
- [ ] Activity Log 不泄露 private 任务标题。
- [ ] 用户输入有长度限制和安全渲染。
- [ ] 归档 / 退出操作需要二次确认。
- [ ] 支持账号删除和基本数据导出。
- [ ] 未来接入 AI 前先做模板文案或输出过滤。
- [ ] 未来接入社交前先做举报 / 拉黑 / 隐私设置。
- [ ] 未来接入日历前明确 free / busy 默认隐私。

---

## 11. 技术实现建议

如果继续使用 Expo + React Native，可以先这样拆结构。

```txt
app/
  index.tsx
  onboarding/
    welcome.tsx
    create-pair-room.tsx
    join-room.tsx
    pending-pair.tsx
    lamb-setup.tsx
    choose-lamb.tsx
  (tabs)/
    today.tsx
    meadow.tsx
    shop.tsx
    buddy.tsx
  settings.tsx

components/
  TaskCard.tsx
  LambAvatar.tsx
  FeedButton.tsx
  BondProgress.tsx
  ActivityItem.tsx
  RewardModal.tsx
  ReminderBubble.tsx
  InviteCard.tsx

contexts/
  AuthContext.tsx
  RoomContext.tsx
  InvitationContext.tsx
  TaskContext.tsx
  LambContext.tsx
  EconomyContext.tsx

data/
  mockUsers.ts
  mockRoom.ts
  mockTasks.ts
  mockItems.ts
  lambPhrases.ts
  unlockRules.ts

types/
  user.ts
  room.ts
  task.ts
  lamb.ts
  economy.ts
  activity.ts
```

V1 再加入：

```txt
app/(tabs)/calendar.tsx
components/ScheduleBlock.tsx
components/AvailabilityGrid.tsx
contexts/ScheduleContext.tsx
data/mockSchedule.ts
types/schedule.ts
```

---

## 12. 当前最重要的产品判断

BaaDo / 咩Do 不做 Single Mode。这个决定让产品更聚焦：

> BaaDo / 咩Do 是一个必须两个人一起开始、一起养小羊、一起完成任务的双人 Todo 产品。

第一阶段重点验证三个问题：

1. **两个人是否愿意因为共同小羊而持续完成任务。**
2. **个人任务照顾小羊、共同任务建设 Meadow 的奖励分工是否足够清楚。**
3. **双人共同进退机制是否能增强关系绑定，而不是制造压力。**

如果这些验证成立，再加入日程同步、AI 排程、第二只小羊、羊圈和小羊社交。

---

## 13. 下一步建议

文档已经完成产品定位、MVP 页面线框、核心数据模型、安全隐私和高并发策略。下一步建议按开发落地顺序推进：

1. **细化数值规则**
   - 小羊 fullness / mood 如何增减。
   - Bond 每级需要多少 points。
   - Home Level 每级需要多少 Home EXP。
   - 个人任务和共同任务的奖励表。

2. **细化 MVP 状态机和接口清单**
   - Room 状态机。
   - Task 状态机。
   - Reward 发放状态机。
   - Invite 使用状态机。
   - API endpoints 初稿。

3. **整理 Codex / Claude 开发提示词**
   - 先做 mock-data prototype。
   - 再做 Supabase / Firebase 后端版本。
   - 明确只实现 P0 页面和核心闭环。

4. **确定视觉风格**
   - 2D 小羊形象。
   - Meadow 色彩系统。
   - 基础组件风格。
   - 动画优先级。

建议下一步先做 **数值规则 + 状态机 + API 清单**，再喂给 Codex 开始开发。

