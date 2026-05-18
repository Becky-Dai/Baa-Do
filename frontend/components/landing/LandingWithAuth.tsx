/**
 * 中文：首页与登录/注册合并页面，插画草地风格。
 * English: Combined landing and auth page with illustrated meadow style.
 */
'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { markHasRoom } from '../auth/LoginPage';
import { LangProvider, useLang, useT } from '../../contexts/LangContext';
import type { LangCode } from '../../lib/i18n/translations';

const SheepHeadCanvas = dynamic(
  () => import('../sheep/SheepHeadCanvas').then((m) => m.SheepHeadCanvas),
  { ssr: false },
);

type Tab = 'login' | 'register';

const LANGUAGES = [
  { code: 'zh-CN', label: '简体中文', short: '简中' },
  { code: 'zh-TW', label: '繁體中文', short: '繁中' },
  { code: 'en',    label: 'English',  short: 'EN'   },
  { code: 'ko',    label: '한국어',   short: 'KR'   },
  { code: 'ja',    label: '日本語',   short: 'JP'   },
  { code: 'es',    label: 'Español',  short: 'ES'   },
];

const FEATURES = [
  { emoji: '🐑', zh: '共养一只小羊' },
  { emoji: '🌿', zh: '个人任务换小草' },
  { emoji: '💰', zh: '共同任务赚金币' },
  { emoji: '🏠', zh: '一起建设草地' },
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
    <div ref={menuRef} style={{ position:'fixed', top:pos.top, right:pos.right, zIndex:9999, width:140, borderRadius:16, overflow:'hidden', background:'#fff', border:'1px solid rgba(0,0,0,0.08)', boxShadow:'0 8px 24px rgba(0,0,0,0.13)' }}>
      {LANGUAGES.map((l) => (
        <button key={l.code} onClick={() => { setLang(l.code as LangCode); setOpen(false); }}
          className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ${l.code === lang ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}>
          <span>{l.label}</span>
          {l.code === lang && <span className="text-green-500 text-xs">✓</span>}
        </button>
      ))}
    </div>, document.body
  ) : null;

  return (
    <>
      <button ref={btnRef} onClick={handleOpen}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600 hover:bg-white/60 transition-colors"
        style={{ background:'rgba(255,255,255,0.45)', border:'1px solid rgba(255,255,255,0.7)', backdropFilter:'blur(8px)' }}>
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M7 1.5C7 1.5 5 4 5 7s2 5.5 2 5.5M7 1.5C7 1.5 9 4 9 7s-2 5.5-2 5.5M1.5 7h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        {current.short} ∨
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
  const [showPw, setShowPw] = useState(false);
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
      setLoading(false); setRegisterSuccess(true);
      setUsername(''); setEmail(''); setPassword('');
      setTimeout(() => { setRegisterSuccess(false); setTab('login'); }, 1500);
    }, 700);
  }

  const inputBase = 'w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/80 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent transition';

  return (
    <div className="w-full bg-white rounded-3xl p-8 shadow-xl" style={{ boxShadow:'0 12px 48px rgba(80,160,80,0.12), 0 2px 8px rgba(0,0,0,0.06)' }}>
      <h2 className="text-2xl font-bold text-center mb-6" style={{ color:'#1a5c35' }}>欢迎回来 👋</h2>

      {/* Tab bar */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-2xl p-1">
        {(['login','register'] as Tab[]).map((tb) => (
          <button key={tb} onClick={() => { setTab(tb); setRegisterSuccess(false); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab===tb ? 'bg-white text-green-700 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
            {tb==='login' ? t('auth.tabLogin') : t('auth.tabRegister')}
          </button>
        ))}
      </div>

      {tab === 'login' ? (
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {registerSuccess && <div className="bg-green-50 border border-green-200 text-green-700 text-xs rounded-2xl px-4 py-2.5 text-center">{t('auth.registerSuccessLogin')}</div>}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M2 4l6 5 6-5M2 4h12v8H2V4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
            </span>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t('auth.placeholderUsername')} className={inputBase}/>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
            </span>
            <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('auth.placeholderPassword')} className={`${inputBase} pr-10`}/>
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-400">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/></svg>
            </button>
          </div>
          <button type="submit" disabled={loading}
            className="mt-1 w-full py-3.5 rounded-2xl font-semibold text-sm text-white transition-all disabled:opacity-60"
            style={{ background:'linear-gradient(135deg,#52c46a,#2da84c)', boxShadow:'0 4px 16px rgba(45,168,76,0.4)' }}>
            {loading ? t('auth.loginLoading') : '♥ 回到小羊身边'}
          </button>
          <p className="text-xs text-center text-gray-400">
            {t('auth.noAccount')}{' '}
            <button type="button" onClick={() => setTab('register')} className="text-green-600 font-semibold hover:text-green-700">{t('auth.doRegister')}</button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          {registerSuccess && <div className="bg-green-50 border border-green-200 text-green-700 text-xs rounded-2xl px-4 py-2.5 text-center">{t('auth.registerSuccessRedirect')}</div>}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.3"/><path d="M2 13c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
            </span>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t('auth.placeholderNewUsername')} className={inputBase}/>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M2 4l6 5 6-5M2 4h12v8H2V4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
            </span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="你的邮箱地址" className={inputBase}/>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
            </span>
            <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('auth.placeholderPasswordNew')} className={`${inputBase} pr-10`}/>
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-400">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/></svg>
            </button>
          </div>
          <button type="submit" disabled={loading||registerSuccess}
            className="mt-1 w-full py-3.5 rounded-2xl font-semibold text-sm text-white transition-all disabled:opacity-60"
            style={{ background:'linear-gradient(135deg,#52c46a,#2da84c)', boxShadow:'0 4px 16px rgba(45,168,76,0.4)' }}>
            {loading ? t('auth.registerLoading') : t('auth.registerBtn')}
          </button>
          <p className="text-xs text-center text-gray-400">
            {t('auth.hasAccount')}{' '}
            <button type="button" onClick={() => setTab('login')} className="text-green-600 font-semibold hover:text-green-700">{t('auth.doLogin')}</button>
          </p>
        </form>
      )}
    </div>
  );
}

function LandingInner() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col md:flex-row"
      style={{ background:'linear-gradient(175deg, #bfe8d4 0%, #d8f0dc 25%, #ecf7e8 50%, #f5f2d8 80%, #faf0c8 100%)' }}>

      {/* Clouds */}
      <div className="pointer-events-none absolute top-6 left-16 w-32 h-16 rounded-full opacity-80" style={{ background:'white', filter:'blur(12px)' }}/>
      <div className="pointer-events-none absolute top-10 left-32 w-24 h-12 rounded-full opacity-70" style={{ background:'white', filter:'blur(8px)' }}/>
      <div className="pointer-events-none absolute top-4 right-80 w-40 h-14 rounded-full opacity-60" style={{ background:'white', filter:'blur(14px)' }}/>
      <div className="pointer-events-none absolute top-14 right-64 w-28 h-10 rounded-full opacity-50" style={{ background:'white', filter:'blur(8px)' }}/>

      {/* Grass ground */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-36"
        style={{ background:'linear-gradient(to top, #7dc872 0%, #9ed87a 50%, transparent 100%)', borderRadius:'60% 60% 0 0 / 30% 30% 0 0' }}/>

      {/* Language switcher */}
      <div className="absolute top-4 right-4 z-20"><LangSelector /></div>

      {/* Center wrapper */}
      <div className="flex-1 flex flex-col md:flex-row items-stretch mx-auto w-full max-w-5xl relative z-10">

      {/* Left — brand */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 md:px-10 py-12">
        <div className="max-w-lg w-full text-center md:text-left">

          {/* Sheep canvas */}
          <SheepHeadCanvas className="w-56 md:w-64 h-[240px] select-none -mb-2 mx-auto md:mx-0" />

          {/* Title */}
          <div className="flex items-baseline gap-2 mb-3">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight" style={{ color:'#1a5c35' }}>BaaDo</h1>
            <span className="text-5xl md:text-6xl font-black tracking-tight" style={{ color:'#52c46a' }}>/ 咩Do</span>
          </div>

          <p className="text-lg font-semibold mb-1" style={{ color:'#1a5c35' }}>
            两个人一起完成 Todo，慢慢养大一只属于你们的小羊。
          </p>
          <p className="text-sm mb-8" style={{ color:'#52a872' }}>
            共同任务赚金币，个人任务收集小草，一起建设属于你们的草地。
          </p>

          {/* 2×2 feature grid — circles */}
          <div className="grid grid-cols-4 gap-5 max-w-md mx-auto md:mx-0">
            {FEATURES.map((f) => (
              <div key={f.zh} className="flex flex-col items-center gap-2.5">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                  style={{ background:'rgba(255,255,255,0.85)', border:'2px solid rgba(255,255,255,0.95)', backdropFilter:'blur(8px)', boxShadow:'0 4px 14px rgba(80,160,80,0.15)' }}
                >
                  {f.emoji}
                </div>
                <span className="text-xs font-semibold text-center leading-snug" style={{ color:'#1a5c35' }}>{f.zh}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Right — auth card */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 md:px-10 py-12">
        <div className="w-full max-w-[380px]">
          <AuthCard />
        </div>
      </div>

      </div>{/* end center wrapper */}
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
