/**
 * 中文：Landing Page 主视觉区域组件。
 * English: Hero section component for the Landing Page.
 */

import Link from 'next/link';
import Button from '../ui/Button';

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center text-center px-6 py-16 gap-6">
      {/* Lamb emoji art */}
      <div className="text-8xl select-none animate-bounce" style={{ animationDuration: '2.5s' }}>
        🐑
      </div>

      <h1 className="text-4xl font-bold text-green-800 leading-tight">
        BaaDo / 咩Do
      </h1>

      <p className="text-lg text-green-700 max-w-xs leading-relaxed">
        两个人一起完成 Todo，<br />
        养大一只只属于你们的小羊。
      </p>

      <p className="text-sm text-gray-500 max-w-xs">
        A two-person todo app where you and your buddy complete real-life tasks to raise a shared virtual lamb together.
      </p>

      <div className="flex flex-col gap-3 w-full max-w-xs mt-2">
        <Link href="/create-room">
          <Button size="lg" variant="primary" className="w-full">
            创建房间 Create Room
          </Button>
        </Link>
        <Link href="/join">
          <Button size="lg" variant="secondary" className="w-full">
            加入房间 Join Room
          </Button>
        </Link>
      </div>
    </section>
  );
}
