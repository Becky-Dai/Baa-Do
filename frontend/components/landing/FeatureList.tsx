/**
 * 中文：Landing Page 产品特性列表组件。
 * English: Feature list component for the Landing Page.
 */

const features = [
  {
    emoji: '🐑',
    title: '共养一只小羊',
    desc: '两个人共同照顾同一只 Pair Lamb，完成任务才能喂到 Mochi。',
  },
  {
    emoji: '✅',
    title: '个人任务 + 共同任务',
    desc: '个人任务照顾小羊，共同任务一起建设草地小窝 Meadow。',
  },
  {
    emoji: '🌿',
    title: '一起建设 Meadow',
    desc: '完成共同任务解锁背景元素，让两个人的 Meadow 越来越丰富。',
  },
  {
    emoji: '💛',
    title: '独立 Bond 亲密度',
    desc: '你和小羊有自己的亲密度，搭子也有，彼此独立不比较。',
  },
];

export default function FeatureList() {
  return (
    <section className="px-6 pb-12 max-w-sm mx-auto">
      <div className="flex flex-col gap-4">
        {features.map((f) => (
          <div key={f.title} className="flex gap-4 items-start bg-white rounded-2xl p-4 shadow-sm">
            <span className="text-2xl">{f.emoji}</span>
            <div>
              <p className="font-semibold text-green-800 text-sm">{f.title}</p>
              <p className="text-gray-500 text-sm mt-0.5">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
