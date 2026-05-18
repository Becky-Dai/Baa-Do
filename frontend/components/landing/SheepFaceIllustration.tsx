/**
 * 中文：简笔画羊脸，三团毛 + 圆脸，眼睛跟随鼠标。
 * English: Simple cartoon sheep face — three wool puffs + round face, eyes track mouse.
 */
'use client';

import { useState, useEffect, useRef } from 'react';

const EYE_L = { x: 76, y: 106 };
const EYE_R = { x: 104, y: 106 };
const MAX = 4;

export default function SheepFaceIllustration({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [lp, setLp] = useState(EYE_L);
  const [rp, setRp] = useState(EYE_R);

  useEffect(() => {
    function track(e: MouseEvent) {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 180;
      const my = ((e.clientY - rect.top) / rect.height) * 180;
      function pull(ex: number, ey: number) {
        const dx = mx - ex, dy = my - ey;
        const d = Math.hypot(dx, dy) || 1;
        const t = Math.min(1, MAX / d);
        return { x: ex + dx * t, y: ey + dy * t };
      }
      setLp(pull(EYE_L.x, EYE_L.y));
      setRp(pull(EYE_R.x, EYE_R.y));
    }
    window.addEventListener('mousemove', track);
    return () => window.removeEventListener('mousemove', track);
  }, []);

  const ink = '#2a2a2a';
  const lw = 3;

  return (
    <svg ref={svgRef} viewBox="0 0 180 180" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">

      {/* Ears — behind everything */}
      <ellipse cx="46" cy="102" rx="13" ry="19" transform="rotate(-12 46 102)"
        fill="#ece4ce" stroke={ink} strokeWidth={lw} strokeLinejoin="round"/>
      <ellipse cx="134" cy="102" rx="13" ry="19" transform="rotate(12 134 102)"
        fill="#ece4ce" stroke={ink} strokeWidth={lw} strokeLinejoin="round"/>
      <ellipse cx="46" cy="103" rx="7" ry="11" transform="rotate(-12 46 103)" fill="#f7c0b4"/>
      <ellipse cx="134" cy="103" rx="7" ry="11" transform="rotate(12 134 103)" fill="#f7c0b4"/>

      {/* Three wool puffs */}
      <circle cx="58"  cy="72" r="28" fill="#ece4ce" stroke={ink} strokeWidth={lw}/>
      <circle cx="90"  cy="60" r="32" fill="#ece4ce" stroke={ink} strokeWidth={lw}/>
      <circle cx="122" cy="72" r="28" fill="#ece4ce" stroke={ink} strokeWidth={lw}/>

      {/* Face circle — draws over the bottom of the wool puffs */}
      <circle cx="90" cy="112" r="46" fill="#fdf8ef" stroke={ink} strokeWidth={lw}/>

      {/* Eyes */}
      <circle cx={EYE_L.x} cy={EYE_L.y} r="13" fill="white" stroke={ink} strokeWidth={lw}/>
      <circle cx={EYE_R.x} cy={EYE_R.y} r="13" fill="white" stroke={ink} strokeWidth={lw}/>

      {/* Pupils */}
      <circle cx={lp.x} cy={lp.y} r="7" fill={ink}/>
      <circle cx={rp.x} cy={rp.y} r="7" fill={ink}/>
      {/* shine */}
      <circle cx={lp.x + 2.5} cy={lp.y - 2.5} r="2" fill="white"/>
      <circle cx={rp.x + 2.5} cy={rp.y - 2.5} r="2" fill="white"/>

      {/* Nostrils */}
      <circle cx="85" cy="126" r="2.5" fill={ink}/>
      <circle cx="95" cy="126" r="2.5" fill={ink}/>

      {/* Smile */}
      <path d="M 78 138 Q 90 148 102 138" stroke={ink} strokeWidth={lw} strokeLinecap="round"/>

    </svg>
  );
}
