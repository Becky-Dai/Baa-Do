/**
 * 中文：首页与登录/注册合并的左右排版页面，温柔插画风格，支持多语言切换。
 * English: Combined landing and auth page with soft illustration style and language switcher.
 */
'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { markHasRoom } from '../auth/LoginPage';
import { LangProvider, useLang, useT } from '../../contexts/LangContext';
import type { LangCode } from '../../lib/i18n/translations';

type Tab = 'login' | 'register';

const LANGUAGES = [
  { code: 'zh-CN', label: '简体中文', short: '简中' },
  { code: 'zh-TW', label: '繁體中文', short: '繁中' },
  { code: 'en',    label: 'English',  short: 'EN'   },
  { code: 'ko',    label: '한국어',   short: 'KR'   },
  { code: 'ja',    label: '日本語',   short: 'JP'   },
  { code: 'es',    label: 'Español',  short: 'ES'   },
];

const FEATURE_KEYS = [
  { emoji: '🐑', key: 'landing.feature1' },
  { emoji: '✅', key: 'landing.feature2' },
  { emoji: '🌿', key: 'landing.feature3' },
  { emoji: '💛', key: 'landing.feature4' },
] as const;

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
      const target = e.target as Node;
      if (!menuRef.current?.contains(target) && !btnRef.current?.contains(target)) setOpen(false);
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
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors hover:bg-white/40"
        style={{
          color: '#2d6a4f',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255,255,255,0.45)',
          border: '1px solid rgba(255,255,255,0.7)',
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

function AuthCard() {
  const t = useT();
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
      const hasRoom = typeof window !== 'undefined' && localStorage.getItem('baado_has_room') === '1';
      router.push(hasRoom ? '/dashboard' : '/create-room');
    }, 600);
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRegisterSuccess(true);
      setUsername(''); setEmail(''); setPassword('');
      setTimeout(() => { setRegisterSuccess(false); setTab('login'); }, 1500);
    }, 700);
  }

  const inputCls = 'w-full px-4 py-2.5 rounded-2xl border border-green-100 bg-white/70 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent transition';
  const labelCls = 'block text-xs font-semibold text-green-700/70 mb-1.5 tracking-wide';

  return (
    <div
      className="w-full rounded-3xl p-7"
      style={{
        background: 'rgba(255,255,255,0.65)',
        backdropFilter: 'blur(24px) saturate(180%)',
        border: '1.5px solid rgba(255,255,255,0.8)',
        boxShadow: '0 8px 40px rgba(134,187,100,0.12), 0 2px 12px rgba(0,0,0,0.06)',
      }}
    >
      <div className="flex gap-1 mb-6 bg-green-50/80 rounded-2xl p-1">
        {(['login', 'register'] as Tab[]).map((tb) => (
          <button
            key={tb}
            onClick={() => { setTab(tb); setRegisterSuccess(false); }}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
              tab === tb ? 'bg-white text-green-700 shadow-sm' : 'text-green-400 hover:text-green-600'
            }`}
          >
            {tb === 'login' ? t('auth.tabLogin') : t('auth.tabRegister')}
          </button>
        ))}
      </div>

      {tab === 'login' ? (
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {registerSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-xs rounded-2xl px-4 py-2.5 text-center">
              {t('auth.registerSuccessLogin')}
            </div>
          )}
          <div>
            <label className={labelCls}>{t('auth.labelUsernameOrEmail')}</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t('auth.placeholderUsername')} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>{t('auth.labelPassword')}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('auth.placeholderPassword')} className={inputCls} />
          </div>
          <button type="submit" disabled={loading} className="mt-1 w-full py-3 rounded-2xl font-semibold text-sm text-white transition-all disabled:opacity-60" style={{ background: 'linear-gradient(135deg, #6ec97f 0%, #4caf6a 100%)', boxShadow: '0 4px 14px rgba(78,175,100,0.35)' }}>
            {loading ? t('auth.loginLoading') : t('auth.loginBtn')}
          </button>
          <p className="text-xs text-center text-gray-400">
            {t('auth.noAccount')}{' '}
            <button type="button" onClick={() => setTab('register')} className="text-green-500 font-semibold hover:text-green-700 transition-colors">{t('auth.doRegister')}</button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          {registerSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-xs rounded-2xl px-4 py-2.5 text-center">
              {t('auth.registerSuccessRedirect')}
            </div>
          )}
          <div>
            <label className={labelCls}>{t('auth.labelNewUsername')}</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t('auth.placeholderNewUsername')} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>{t('auth.labelEmail')}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>{t('auth.labelPassword')}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('auth.placeholderPasswordNew')} className={inputCls} />
          </div>
          <button type="submit" disabled={loading || registerSuccess} className="mt-1 w-full py-3 rounded-2xl font-semibold text-sm text-white transition-all disabled:opacity-60" style={{ background: 'linear-gradient(135deg, #6ec97f 0%, #4caf6a 100%)', boxShadow: '0 4px 14px rgba(78,175,100,0.35)' }}>
            {loading ? t('auth.registerLoading') : t('auth.registerBtn')}
          </button>
          <p className="text-xs text-center text-gray-400">
            {t('auth.hasAccount')}{' '}
            <button type="button" onClick={() => setTab('login')} className="text-green-500 font-semibold hover:text-green-700 transition-colors">{t('auth.doLogin')}</button>
          </p>
        </form>
      )}
    </div>
  );
}

function LandingInner() {
  const t = useT();

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #e8f5e3 0%, #f0faf4 35%, #fef9ec 70%, #fdf3e7 100%)' }}
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, #b7e4c1, transparent 70%)' }} />
      <div className="pointer-events-none absolute bottom-[-60px] right-[-60px] w-64 h-64 rounded-full opacity-25" style={{ background: 'radial-gradient(circle, #fde68a, transparent 70%)' }} />

      {/* Language switcher */}
      <div className="absolute top-4 right-4 z-20">
        <LangSelector />
      </div>

      {/* Left — brand */}
      <div className="flex-1 flex flex-col justify-center items-center md:items-start px-10 md:px-16 py-16 relative z-10">
        <div className="max-w-md w-full">
          <div className="text-8xl md:text-9xl mb-6 select-none w-fit" style={{ animation: 'bounce 3s ease-in-out infinite', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.08))' }}>
            🐑
          </div>
          <div className="mb-2 flex items-baseline gap-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none" style={{ color: '#2d6a4f' }}>BaaDo</h1>
            <span className="text-4xl md:text-5xl font-black tracking-tight leading-none" style={{ color: '#74b98a' }}>/ 咩Do</span>
          </div>
          <p className="text-base md:text-lg leading-relaxed mt-4 mb-10" style={{ color: '#40916c' }}>
            {t('landing.tagline')}
          </p>
          <div className="flex flex-wrap gap-2">
            {FEATURE_KEYS.map((f) => (
              <div key={f.key} className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-sm font-medium" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', color: '#3a7d5a', boxShadow: '0 2px 8px rgba(100,180,120,0.1)' }}>
                <span className="text-base">{f.emoji}</span>
                <span>{t(f.key)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — auth card */}
      <div className="w-full md:w-[420px] flex flex-col justify-center px-6 md:px-10 py-12 relative z-10">
        <div className="max-w-sm mx-auto w-full">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1" style={{ color: '#2d6a4f' }}>{t('auth.welcome')}</h2>
            <p className="text-sm" style={{ color: '#95b8a2' }}>{t('auth.welcomeHint')}</p>
          </div>
          <AuthCard />
        </div>
      </div>
    </div>
  );
}

export default function LandingWithAuth() {
  return (
    <LangProvider>
      <LandingInner />
    </LangProvider>
  );
}
