/**
 * 中文：登录/注册页面组件。注册成功后回到登录 tab；登录时根据是否已有房间决定跳转目标。
 * English: Login/register page. After register, returns to login tab. Login redirects based on whether the user has a room.
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Tab = 'login' | 'register';

const HAS_ROOM_KEY = 'baado_has_room';

export function markHasRoom() {
  if (typeof window !== 'undefined') localStorage.setItem(HAS_ROOM_KEY, '1');
}

function getHasRoom() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(HAS_ROOM_KEY) === '1';
}

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (getHasRoom()) {
        router.push('/dashboard');
      } else {
        router.push('/create-room');
      }
    }, 600);
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRegisterSuccess(true);
      setUsername('');
      setEmail('');
      setPassword('');
      setTimeout(() => {
        setRegisterSuccess(false);
        setTab('login');
      }, 1500);
    }, 700);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 via-green-50 to-amber-50 px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🐑</div>
          <h1 className="text-2xl font-bold text-green-800 tracking-tight">BaaDo</h1>
          <p className="text-sm text-green-600 mt-1">和你的搭子，一起照顾 Mochi</p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/60 overflow-hidden">

          {/* Tab bar */}
          <div className="flex border-b border-gray-100">
            {(['login', 'register'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setRegisterSuccess(false); }}
                className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
                  tab === t
                    ? 'text-green-700 border-b-2 border-green-500 bg-green-50/50'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {t === 'login' ? '登录' : '注册'}
              </button>
            ))}
          </div>

          <div className="px-6 py-6">
            {tab === 'login' ? (
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                {registerSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl px-4 py-2.5 text-center">
                    注册成功！请登录继续
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">用户名 / 邮箱</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="输入你的用户名"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">密码</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="输入你的密码"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent transition"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 w-full py-2.5 rounded-xl bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold text-sm transition-colors disabled:opacity-60"
                >
                  {loading ? '登录中…' : '登录'}
                </button>
                <p className="text-xs text-center text-gray-400">
                  还没有账号？{' '}
                  <button type="button" onClick={() => setTab('register')} className="text-green-600 font-semibold hover:underline">
                    立即注册
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                {registerSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl px-4 py-2.5 text-center">
                    注册成功！跳转到登录…
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">用户名</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="给自己起个名字"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">邮箱</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">密码</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="至少 8 位"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent transition"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || registerSuccess}
                  className="mt-1 w-full py-2.5 rounded-xl bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold text-sm transition-colors disabled:opacity-60"
                >
                  {loading ? '注册中…' : '注册'}
                </button>
                <p className="text-xs text-center text-gray-400">
                  已有账号？{' '}
                  <button type="button" onClick={() => setTab('login')} className="text-green-600 font-semibold hover:underline">
                    直接登录
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          <Link href="/" className="hover:text-gray-600 transition-colors">← 返回首页</Link>
        </p>
      </div>
    </main>
  );
}
